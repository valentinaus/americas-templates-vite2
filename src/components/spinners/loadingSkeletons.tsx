import { Skeleton } from "@chakra-ui/react";
import React, { Fragment } from "react";

const LoadingSkeletons = () => {
  return (
    <Fragment>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
    </Fragment>
  );
};
export default LoadingSkeletons;
