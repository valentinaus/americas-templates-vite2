import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
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
import React, { useContext, useEffect, useState } from "react";
import { ProjectsCTX } from "../../../contexts/projects.context";
import { updateProject } from "../../../services/projects.services";
import { MultiSelect } from "react-multi-select-component";

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
  const [selectedTemplates, setSelectedTemplates] = useState<any[]>([]);

  const submitUpdateProject = async (values, actions) => {
    if (selectedProject) {
      const obj = {
        ...values,
        templateIds: values.templateIds.map((item) => item.value),
      };

      try {
        setIsLoading(true);
        const response = await updateProject(
          user.token,
          selectedProject.id,
          obj
        );
        console.log(response);
        actions.setSubmitting(false);
        actions.resetForm();
        cancelButtonHandler();
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
        setSelectedTemplates([]);
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
    formik.resetForm();
    setSelectedProject(null);
    setSelectedTemplates([]);
    onClose();
  };

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name required"),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Name cannot contain special caracters"
    // )
    description: Yup.string().required("Description required"),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Description cannot contain special caracters"
    // )
    technician: Yup.string().matches(
      /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
      "technician cannot contain special caracters"
    ),

    phoneClientId: Yup.string().required("Device required"),
    siteId: Yup.string().required("Site required"),
    templateIds: Yup.array()
      .test(
        "NotEmptyArray",
        "Template required",
        (val) => !!(val && val.length > 0)
      )
      .required("Templates required"),
  });

  useEffect(() => {
    const findTemplates = () => {
      if (selectedProject?.templates) {
        const _templates = selectedProject.templates.map((item) => {
          const obj = { label: item.name, value: item.id };

          return obj;
        });
        setSelectedTemplates(_templates);
        return _templates;
      }
    };
    findTemplates();
  }, [selectedProject?.templates]);

  const formik = useFormik({
    initialValues: {
      name: selectedProject ? `${selectedProject.name}` : "",
      description: selectedProject ? `${selectedProject.description}` : "",
      technician:
        selectedProject && selectedProject.technician !== null
          ? `${selectedProject.technician}`
          : "",
      phoneClientId: selectedProject ? `${selectedProject.phoneClientId}` : "",
      siteId: selectedProject ? `${selectedProject.siteId}` : "",
      templateIds: "",
    },
    validationSchema: formSchema,
    onSubmit: submitUpdateProject,
    enableReinitialize: true,
  });

  useEffect(() => {
    formik.setFieldValue("templateIds", selectedTemplates);
  }, [selectedTemplates]);

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"50rem"}>
        <ModalHeader color={"brand.gray.dark"}>Update Project</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <VStack
            as="form"
            onSubmit={formik.handleSubmit as any}
            spacing={4}
            alignItems={"flex-start"}
          >
            <HStack width={"100%"} alignItems={"flex-start"} spacing={6}>
              <VStack width={"50%"}>
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
                  <FormErrorMessage>
                    {formik.errors.description}
                  </FormErrorMessage>
                </FormControl>

                <FormControl
                  display={"flex"}
                  flexDir={"column"}
                  isInvalid={
                    (formik.errors.technician as any) &&
                    (formik.touched.technician as any)
                  }
                >
                  <FormLabel fontWeight="medium">Technician</FormLabel>
                  <Input
                    {...formik.getFieldProps("technician")}
                    id="technician"
                    name="technician"
                    placeholder={"Insert project technician"}
                    size="sm"
                    borderRadius="4px"
                    borderColor={"brand.gray.mediumLight"}
                  />
                  <FormErrorMessage>
                    {formik.errors.technician}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  display={"flex"}
                  flexDir={"column"}
                  isInvalid={
                    (formik.errors.phoneClientId as any) &&
                    (formik.touched.phoneClientId as any)
                  }
                >
                  <FormLabel fontWeight="medium">Device</FormLabel>
                  <Select
                    {...formik.getFieldProps("phoneClientId")}
                    id="phoneClientId"
                    name="phoneClientId"
                    placeholder={"Select project device"}
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
                  <FormErrorMessage>
                    {formik.errors.phoneClientId}
                  </FormErrorMessage>
                </FormControl>
              </VStack>

              <VStack width={"50%"}>
                <FormControl
                  display={"flex"}
                  flexDir={"column"}
                  isInvalid={
                    (formik.errors.siteId as any) &&
                    (formik.touched.siteId as any)
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
                    (formik.errors.templateIds as any) &&
                    (formik.touched.templateIds as any)
                  }
                >
                  <FormLabel fontWeight="medium">Template</FormLabel>
                  <MultiSelect
                    {...formik.getFieldProps("templateIds")}
                    className="multi-select-styles"
                    options={
                      templatesList &&
                      templatesList.length > 0 &&
                      templatesList.map((item) => {
                        const obj = { label: item.name, value: item.id };
                        return obj;
                      })
                    }
                    value={selectedTemplates}
                    onChange={setSelectedTemplates}
                    labelledBy="Select templates"
                  />

                  <FormErrorMessage>
                    {formik.errors.templateIds}
                  </FormErrorMessage>
                </FormControl>
              </VStack>
            </HStack>
            <Flex pb={4} justifyContent={"flex-end"} w={"100%"}>
              <Divider />
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
