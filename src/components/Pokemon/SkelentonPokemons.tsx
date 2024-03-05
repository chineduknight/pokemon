// components/SkeletonPokemons.jsx
import { Flex, Skeleton } from "@chakra-ui/react";

type SkeletonPokemonsProps = {
  count?: number;
};

const SkeletonPokemons = ({ count = 9 }: SkeletonPokemonsProps) => (
  <Flex wrap="wrap" justify="center" gap="20px">
    {Array.from({ length: count }, (_, index) => (
      <Skeleton key={index} height="320px" width="200px" borderRadius="md" />
    ))}
  </Flex>
);

export default SkeletonPokemons;
