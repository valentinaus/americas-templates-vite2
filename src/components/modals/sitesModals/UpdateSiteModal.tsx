import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { SitesCTX } from "../../../contexts/sites.context";
import { ISite } from "../../../interfaces/sites.interfaces";

interface ISiteValues {
  name: string;
  latitude: string;
  longitude: string;
}

const UpdateSiteModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    isLoading,
    setIsLoading,
    selectedSite,
    setSelectedSite,
  } = useContext(SitesCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedSite(null);
  };

  const submitUpdateSite = (values: ISiteValues, actions) => {
    const siteObj = {
      ...values,
      latitude: values.latitude.toString(),
      longitude: values.longitude.toString(),
    };
    console.log("values", siteObj);
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name required")
      .matches(
        /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
        "Name cannot contain special caracters"
      ),
    latitude: Yup.number().required("Latitude required"),
    longitude: Yup.number().required("Longitude required"),
  });

  const formik = useFormik({
    initialValues: {
      name: selectedSite ? `${selectedSite.name}` : "",
      latitude: selectedSite ? `${selectedSite.latitude}` : "",
      longitude: selectedSite ? `${selectedSite.longitude}` : "",
    },
    validationSchema: formSchema,
    onSubmit: submitUpdateSite,
    enableReinitialize: true,
  });

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Update Site</ModalHeader>
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
                (formik.errors.latitude as any) &&
                (formik.touched.latitude as any)
              }
            >
              <FormLabel fontWeight="medium">Latitude</FormLabel>

              <InputGroup size={"sm"}>
                <InputLeftAddon
                  children="Number"
                  color={"brand.gray.mediumLight"}
                />
                <Input
                  placeholder="Insert site latitude"
                  {...formik.getFieldProps("latitude")}
                  id="latitude"
                  name="latitude"
                  type="number"
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

              <InputGroup size={"sm"}>
                <InputLeftAddon
                  children="Number"
                  color={"brand.gray.mediumLight"}
                />

                <Input
                  placeholder="Insert site longitude"
                  {...formik.getFieldProps("longitude")}
                  id="longitude"
                  name="longitude"
                  type="number"
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
                Update
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default UpdateSiteModal;
