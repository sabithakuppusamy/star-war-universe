import React from "react";
import {
  SkeletonCircle,
  SkeletonText,
  Box,
  useColorModeValue,
  Skeleton,
} from "@chakra-ui/react";

export const LoadingCard = () => {
  return (
    <Box
      h={"auto"}
      p={5}
      minW={{ base: "64", md: "72" }}
      borderRadius={"5%"}
      as="article"
      bg={useColorModeValue("white", "black")}
      boxShadow={"2xl"}
    >
      <SkeletonCircle m={"15px auto"} size="150px" />
      <Skeleton height="20px" w={"80%"} mx={"auto"} my={8} />
      <SkeletonText my="2" noOfLines={2} spacing="4" w={"80%"} mx={"auto"} />
    </Box>
  );
};
