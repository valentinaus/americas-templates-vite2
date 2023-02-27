import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { SitesCTX } from "../../../contexts/sites.context";
import { postSite } from "../../../services/sites.services";
import { PhoneIcon } from "@chakra-ui/icons";
import { HashtagIcon } from "@heroicons/react/solid";

const AddSiteModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const { setRefresh, refreshList, setIsLoading } = useContext(SitesCTX);

  const submitSite = async (values, actions) => {
    const obj = {
      ...values,
      latitude: values.latitude.toString(),
      longitude: values.longitude.toString(),
    };
    try {
      setIsLoading(true);
      const response = await postSite(user.token, obj);
      console.log(response);
      actions.setSubmitting(false);
      actions.resetForm();
      onClose();
      setRefresh(!refreshList);
      toast({
        title: "Site creation successful",
        description: "The site was created successfully",
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
        title: "Site creation unsuccessfull",
        description: "The site couldn't be created. try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const cancelButtonHandler = () => {
    onClose();
    formik.resetForm();
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name required")
      .matches(
        /^([A-zÀ-ú]|[0-9]|[-'_ `´,.])+$/,
        "Name cannot contain special caracters"
      ),
    description: Yup.string()
      .required("Description required")
      .matches(
        /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
        "Description cannot contain special caracters"
      ),
    latitude: Yup.string().required("Latitude required"),
    longitude: Yup.string().required("Longitude required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      latitude: "",
      longitude: "",
    },
    validationSchema: formSchema,
    onSubmit: submitSite,
  });

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Create Site</ModalHeader>
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
                placeholder={"Insert site name"}
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
                placeholder={"Insert site description"}
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
                (formik.errors.latitude as any) &&
                (formik.touched.latitude as any)
              }
            >
              <FormLabel fontWeight="medium">Latitude</FormLabel>

              <InputGroup size={"sm"}>
                {/* <InputLeftAddon
                  children="Number"
                  color={"brand.gray.mediumLight"}
                /> */}
                <Input
                  placeholder="Insert site latitude"
                  {...formik.getFieldProps("latitude")}
                  id="latitude"
                  name="latitude"
                  size="sm"
                  borderRadius="4px"
                  borderColor={"brand.gray.light"}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.latitude}</FormErrorMessage>
            </FormControl>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.longitude as any) &&
                (formik.touched.longitude as any)
              }
            >
              <FormLabel fontWeight="medium">Longitude</FormLabel>
              {/* <Input
                {...formik.getFieldProps("longitude")}
                id="longitude"
                name="longitude"
                type={"number"}
                placeholder={"Insert site longitude"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              /> */}

              <InputGroup size={"sm"}>
                {/* <InputLeftAddon
                  children="#A"
                  color={"brand.gray.mediumLight"}
                /> */}

                <Input
                  placeholder="Insert site longitude"
                  {...formik.getFieldProps("longitude")}
                  id="longitude"
                  name="longitude"
                  // type="number"
                  size="sm"
                  borderRadius="4px"
                  borderColor={"brand.gray.light"}
                />
              </InputGroup>

              <FormErrorMessage>{formik.errors.longitude}</FormErrorMessage>
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
                Create
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddSiteModal;
