import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { ProjectsCTX } from "../../../contexts/projects.context";
import { updateProject } from "../../../services/projects.services";

const UpdateProjectModal = ({
  isOpen,
  onClose,
  sitesList,
  phoneNumberList,
  templatesList,
}) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    setIsLoading,
    selectedProject,
    setSelectedProject,
  } = useContext(ProjectsCTX);

  const submitUpdateProject = async (values, actions) => {
    if (selectedProject) {
      console.log(values);

      try {
        setIsLoading(true);
        const response = await updateProject(
          user.token,
          selectedProject.id,
          values
        );
        console.log(response);
        actions.setSubmitting(false);
        actions.resetForm();
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "Project update successful",
          description: "The project was updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      } catch (error) {
        actions.setSubmitting(false);
        setIsLoading(false);
        actions.resetForm();
        console.log(error);
        toast({
          title: "Project update unsuccessfull",
          description: "The project couldn't be update. try again later",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const cancelButtonHandler = () => {
    onClose();
    formik.resetForm();
    setSelectedProject(null);
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name required")
      .matches(
        /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
        "Name cannot contain special caracters"
      ),
    description: Yup.string()
      .required("Description required")
      .matches(
        /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
        "Description cannot contain special caracters"
      ),

    phoneClientId: Yup.string().required("Client phone required"),
    siteId: Yup.string().required("Site required"),
    templateId: Yup.string().required("Template required"),
  });

  const formik = useFormik({
    initialValues: {
      name: selectedProject ? `${selectedProject.name}` : "",
      description: selectedProject ? `${selectedProject.description}` : "",
      phoneClientId: selectedProject ? `${selectedProject.phoneClientId}` : "",
      siteId: selectedProject ? `${selectedProject.siteId}` : "",
      templateId: selectedProject ? `${selectedProject.templateId}` : "",
    },
    validationSchema: formSchema,
    onSubmit: submitUpdateProject,
    enableReinitialize: true,
  });

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Update Project</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <VStack as="form" onSubmit={formik.handleSubmit as any} spacing={4}>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.name as any) && (formik.touched.name as any)
              }
            >
              <FormLabel fontWeight="medium">Name</FormLabel>
              <Input
                {...formik.getFieldProps("name")}
                id="name"
                name="name"
                placeholder={"Insert project name"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              />
              <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
            </FormControl>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.description as any) &&
                (formik.touched.description as any)
              }
            >
              <FormLabel fontWeight="medium">Description</FormLabel>
              <Input
                {...formik.getFieldProps("description")}
                id="description"
                name="description"
                placeholder={"Insert project description"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.phoneClientId as any) &&
                (formik.touched.phoneClientId as any)
              }
            >
              <FormLabel fontWeight="medium">Client phone</FormLabel>
              <Select
                {...formik.getFieldProps("phoneClientId")}
                id="phoneClientId"
                name="phoneClientId"
                placeholder={"Select project client phone"}
                _placeholder={{ color: "brand.gray.mediumLight" }}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              >
                {phoneNumberList &&
                  phoneNumberList.length > 0 &&
                  phoneNumberList.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        color={"brand.gray.superDark"}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </Select>
              <FormErrorMessage>{formik.errors.phoneClientId}</FormErrorMessage>
            </FormControl>

            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.siteId as any) && (formik.touched.siteId as any)
              }
            >
              <FormLabel fontWeight="medium">Site</FormLabel>
              <Select
                {...formik.getFieldProps("siteId")}
                id="siteId"
                name="siteId"
                placeholder={"Select a site"}
                _placeholder={{ color: "brand.gray.mediumLight" }}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              >
                {sitesList &&
                  sitesList.length > 0 &&
                  sitesList.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        color={"brand.gray.superDark"}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </Select>
              <FormErrorMessage>{formik.errors.siteId}</FormErrorMessage>
            </FormControl>

            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.templateId as any) &&
                (formik.touched.templateId as any)
              }
            >
              <FormLabel fontWeight="medium">Template</FormLabel>
              <Select
                {...formik.getFieldProps("templateId")}
                id="templateId"
                name="templateId"
                placeholder={"Select a template"}
                _placeholder={{ color: "brand.gray.mediumLight" }}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              >
                {templatesList &&
                  templatesList.length > 0 &&
                  templatesList.map((item) => {
                    return (
                      <option
                        key={item.id}
                        value={item.id}
                        color={"brand.gray.superDark"}
                      >
                        {item.name}
                      </option>
                    );
                  })}
              </Select>
              <FormErrorMessage>{formik.errors.templateId}</FormErrorMessage>
            </FormControl>

            <Divider />

            <Flex pb={4} justifyContent={"flex-end"} w={"100%"}>
              <Button
                size={"sm"}
                variant="ghost"
                mr={3}
                onClick={cancelButtonHandler}
              >
                Cancel
              </Button>
              <Button
                size={"sm"}
                colorScheme="blue"
                type="submit"
                loadingText="Loading..."
                isLoading={formik.isSubmitting}
              >
                Update
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default UpdateProjectModal;
