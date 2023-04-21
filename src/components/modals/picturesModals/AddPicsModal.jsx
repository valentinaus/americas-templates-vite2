import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Button,
  Image,
  Text,
  Icon,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { PhotographIcon } from "@heroicons/react/solid";
import React, {
  Fragment,
  useCallback,
  useMemo,
  useState,
  useContext,
} from "react";
import { useDropzone } from "react-dropzone";
import uploadIgm from "../../../assets/uploadImg.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PIcturesCTX } from "../../../contexts/pictures.context";
import { postPicture } from "../../../services/pictures.services";
import { useSelector } from "react-redux";
import { calcLength } from "framer-motion";

const AddPicsModal = ({ isOpen, onClose }) => {
  const [imageSelected, setImageSelected] = useState(null);
  const [errors, setErrors] = useState("");
  const [myfiles, setMyfiles] = useState([]);
  const { setRefresh, refreshList, setIsLoading } = useContext(PIcturesCTX);
  const { user } = useSelector((state) => state.auth);
  const MAX_SIZE = 1048576;
  const toast = useToast();
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles);
      const filesArray = [...acceptedFiles];
      setMyfiles(filesArray);

      filesArray.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = (e) => {
          const binaryStr = reader.result;
          formik.setFieldValue("base64Image", binaryStr);
          setImageSelected(binaryStr);
        };

        // filesRejections.forEach((file) => {
        //   file.forEach((err) => {
        //     if (err.code === "file-too-large") {
        //       setErrors(`Error: ${err.message}`);
        //     }
        //   });
        // });

        reader.readAsDataURL(file);
      });
    },
    [myfiles]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    isDragAccept,
    isDragReject,
    isFocused,
    rejectedFiles,
    maxSize,
    fileRejections,
  } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
    maxSize: MAX_SIZE,
    // validator: maxFileSize,
  });

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Photo name required"),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Name cannot contain special caracters"
    // )
    description: Yup.string().required("Description required"),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Description cannot contain special caracters"
    // )
    base64Image: Yup.string().required("Image required"),
  });

  const cancelButtonHandler = () => {
    onClose();
    formik.resetForm();
    setImageSelected(null);
    setMyfiles([]);
  };

  const submitUploadedFiles = async (values, actions) => {
    try {
      setIsLoading(true);

      const response = await postPicture(user.token, values);
      console.log(response);
      actions.setSubmitting(false);
      actions.resetForm();
      onClose();
      setImageSelected(null);
      setMyfiles([]);
      setRefresh(!refreshList);
      toast({
        title: "Picture uploaded successful",
        description: "This picture was uploaded successfully",
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
        title: "Picture uploaded unsuccessfull",
        description: "This picture couldn't be uploaded. try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      base64Image: "",
    },
    validationSchema: formSchema,
    onSubmit: submitUploadedFiles,
    enableReinitialize: true,
  });

  const filesToShow = myfiles.map((file) => (
    <Flex
      key={file.path}
      alignItems={"center"}
      border={"1px"}
      borderRadius={"8px"}
      w={"100%"}
      px={2}
      borderColor={"brand.gray.mediumLight"}
      mt={2}
    >
      <Icon
        as={PhotographIcon}
        w={10}
        h={10}
        color={"brand.gray.mediumLight"}
        mr={2}
      />

      <Flex
        flexDir={"column"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        overflow={"hidden"}
      >
        <Text
          fontSize={"sm"}
          color={"brand.gray.superDark"}
          fontWeight={"500"}
          // textOverflow={"ellipsis"}
          // width={"10rem"}
        >
          {file.path}
        </Text>

        <Text fontSize={"sm"} color={"brand.gray.superDark"} fontWeight={"500"}>
          - {file.size} bytes
        </Text>
      </Flex>
    </Flex>
  ));

  const filesRejected = fileRejections.map(({ file, errors }) => (
    <Flex
      key={file.name}
      alignItems={"center"}
      border={"1px"}
      borderRadius={"8px"}
      w={"100%"}
      px={2}
      borderColor={"brand.gray.mediumLight"}
      mt={2}
    >
      <Icon
        as={PhotographIcon}
        w={10}
        h={10}
        color={"brand.gray.mediumLight"}
        mr={2}
      />

      <Flex
        flexDir={"column"}
        textOverflow={"ellipsis"}
        whiteSpace={"nowrap"}
        overflow={"hidden"}
      >
        <Text
          fontSize={"sm"}
          color={"brand.red.medium"}
          fontWeight={"500"}
          // textOverflow={"ellipsis"}
          // width={"10rem"}
        >
          {file.path}
        </Text>

        <Text fontSize={"sm"} color={"brand.red.medium"} fontWeight={"500"}>
          - {file.size} bytes
        </Text>

        {errors.map((e) => (
          <Text fontSize={"12px"} color={"brand.red.medium"} fontWeight={"500"}>
            {e.message}
          </Text>
        ))}
      </Flex>
    </Flex>
  ));

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>
          <Text>Upload file</Text>
          <Text fontSize={"sm"} fontWeight={400}>
            Upload a picture and give it a name
          </Text>
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as="form"
            onSubmit={formik.handleSubmit}
            flexDir={"column"}
            w={"100%"}
            mb={4}
            gap={2}
          >
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={formik.errors.name && formik.touched.name}
            >
              <FormLabel fontWeight="medium">Name</FormLabel>
              <Input
                {...formik.getFieldProps("name")}
                id="name"
                name="name"
                placeholder={"Insert photo name"}
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
                formik.errors.description && formik.touched.description
              }
            >
              <FormLabel fontWeight="medium">Description</FormLabel>
              <Input
                {...formik.getFieldProps("description")}
                id="description"
                name="description"
                placeholder={"Insert photo description"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>

            <FormControl
              isInvalid={
                formik.errors.description && formik.touched.description
              }
            >
              <Flex
                {...getRootProps()}
                border={"1px"}
                borderColor={
                  isDragAccept
                    ? "brand.green.medium"
                    : isDragReject
                    ? "brand.red.medium"
                    : "brand.gray.dark"
                }
                borderRadius={"8px"}
                p={2}
                borderWidth={"2px"}
                borderStyle={"dashed"}
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <input {...getInputProps()} />

                <Image src={uploadIgm} h={"4rem"} w={"4rem"} opacity={"45%"} />

                {isDragActive ? (
                  <Fragment>
                    {isDragAccept ? (
                      <Text
                        fontSize={"sm"}
                        color={"brand.gray.superDark"}
                        fontWeight={"bold"}
                      >
                        Drop the file here ...
                      </Text>
                    ) : (
                      <Flex flexDir={"column"} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"brand.red.medium"}>
                          {
                            "Only *.jpeg, *.jpg and *.png images will be accepted"
                          }
                        </Text>
                        <Text fontSize={"sm"} color={"brand.red.medium"}>
                          {"Maximum one (1) file"}
                        </Text>
                        <Text fontSize={"sm"} color={"brand.red.medium"}>
                          {`File too large. Max size of 2MB`}
                        </Text>
                      </Flex>
                    )}
                  </Fragment>
                ) : (
                  <Flex flexDir={"column"} alignItems={"center"}>
                    <Text
                      fontSize={"sm"}
                      color={"brand.gray.superDark"}
                      cursor={"pointer"}
                    >
                      <strong>
                        <u> Click to upload file</u>
                      </strong>{" "}
                      or drag and drop it.
                    </Text>
                    <Text
                      fontSize={"11px"}
                      color={"brand.gray.superDark"}
                      cursor={"pointer"}
                    >
                      (Only *.jpeg, *.jpg and *.png images will be accepted)
                    </Text>
                  </Flex>
                )}
              </Flex>
              <FormErrorMessage>{formik.errors.base64Image}</FormErrorMessage>
            </FormControl>

            {myfiles && myfiles.length > 0 && (
              <Flex flexDir={"column"} mt={2}>
                <Text fontWeight={500} fontSize={"sm"}>
                  Uploaded file:
                </Text>
                <Flex flexDir={"column"}>
                  <>{filesToShow}</>
                </Flex>
              </Flex>
            )}

            {fileRejections && fileRejections.length > 0 && (
              <Flex flexDir={"column"} mt={2}>
                <Text
                  fontWeight={500}
                  fontSize={"sm"}
                  // color={"brand.red.medium"}
                >
                  Rejected file:
                </Text>
                <Flex flexDir={"column"}>
                  <>{filesRejected}</>
                </Flex>
              </Flex>
            )}

            <Divider />

            <Flex pb={4} justifyContent={"flex-end"} w={"100%"} mt={4}>
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
                loadingText="Uploading..."
                isLoading={formik.isSubmitting}
              >
                Upload picture
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddPicsModal;
