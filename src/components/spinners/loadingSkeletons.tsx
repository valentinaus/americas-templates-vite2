import { SimpleGrid, Skeleton } from "@chakra-ui/react";
import React, { Fragment } from "react";

export const LoadingSkeletons = () => {
  return (
    <SimpleGrid w={"100%"} spacing={4} columns={[1, 2, 3, 5, 6]}>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
      <Skeleton h={"200px"} borderRadius={"4px"}></Skeleton>
    </SimpleGrid>
  );
};

export const LoadingRecentProjectSkeletons = () => {
  return (
    <SimpleGrid w={"100%"} spacing={4} columns={[1, 2, 3, 5, 6]}>
      <Skeleton h={"100px"} borderRadius={"4px"} />
      <Skeleton h={"100px"} borderRadius={"4px"} />
      <Skeleton h={"100px"} borderRadius={"4px"} />
      <Skeleton h={"100px"} borderRadius={"4px"} />
      <Skeleton h={"100px"} borderRadius={"4px"} />
    </SimpleGrid>
  );
};
