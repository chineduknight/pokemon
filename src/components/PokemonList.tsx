import React from "react";
import PokemonCard from "./PokemonCard";
import usePokemonData from "../hooks/usePokemonData";
// import SkeletonPokemons from "./SkeletonPokemons";
// import ErrorDisplay from "./ErrorDisplay"; // Assuming you have this component
// import NoResultsFound from "./NoResultsFound"; // Assuming you have this component
import { Flex } from "@chakra-ui/react";
import { ErrorDisplay, NoResultsFound } from "./Loader";
import SkeletonPokemons from "./Pokemon/SkelentonPokemons";
import { hashStringToIndex } from "utils/helper";
import { pokemonImages } from "constants/index";

type PokemonListProps = {
  category: string;
  searchTerm: string;
  onClick: (pokemon, imageURL) => void;
};

const PokemonList = (props: PokemonListProps) => {
  const { category, searchTerm, onClick } = props;
  const { data, isLoading, isError } = usePokemonData(category, searchTerm);

  if (isError) return <ErrorDisplay message="Failed to fetch Pokémon data." />;
  if (isLoading) return <SkeletonPokemons count={9} />;
  if (!data || data.length === 0) return <NoResultsFound />;

  return (
    <Flex wrap="wrap" justify="center" gap="20px">
      {/*  <Flex width="1200px" flexWrap="wrap" alignItems="center" justifyContent="center">
       */}
      {data.map((pokemon) => {
        const imageIndex = hashStringToIndex(pokemon.name, pokemonImages.length);
        const imageURL = pokemonImages[imageIndex];
        return (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            imageURL={imageURL}
            onClick={() => onClick(pokemon, imageURL)}
          />
        );
      })}
    </Flex>
  );
};

export default PokemonList;
