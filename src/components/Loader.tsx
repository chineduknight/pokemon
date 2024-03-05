import { Spinner, Center, Image, Skeleton, Flex, Box } from "@chakra-ui/react";
import { noResultURL } from "constants/index";

const Loader = () => {
  return (
    <Center h="100vh" w="100%">
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="black" size="xl" />
    </Center>
  );
};

export const SkeletonCategories = () => (
  <Flex width="970px" flexWrap="wrap" alignItems="center" justifyContent="center">
    {[...Array(20)].map((_, index) => (
      <Skeleton key={index} height="40px" width="120px" m="8px" borderRadius="5px" />
    ))}
  </Flex>
);

export const ErrorDisplay = ({ message }: any) => <Box color="red">{message}</Box>;

export const NoResultsFound = () => (
  <Image src={noResultURL} alt="Nothing Found" borderRadius="7%" w="400px" />
);

export default Loader;
