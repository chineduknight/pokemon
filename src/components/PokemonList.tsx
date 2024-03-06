import React, { useMemo, useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";
import usePokemonData from "../hooks/usePokemonData";
import { Flex, Box } from "@chakra-ui/react";
import { ErrorDisplay, NoResultsFound } from "./Loader";
import { hashStringToIndex } from "utils/helper";
import { pokemonImages } from "constants/index";
import Pagination from "./Pokemon/Pagination";
import SkeletonPokemons from "./Pokemon/SkelentonPokemons";

type PokemonListProps = {
  category: string;
  searchTerm: string;
  onClick: (pokemon, imageURL) => void;
};

const PokemonList = ({ category, searchTerm, onClick }: PokemonListProps) => {
  const { data, isLoading, isError } = usePokemonData(category);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 25;

  useEffect(() => {
    // Reset currentPage to 0 whenever searchTerm changes
    // without this the search will only appear in the filteredData
    setCurrentPage(0);
  }, [searchTerm]);

  // Search for pokemon on the main dataset
  const filteredData = useMemo(() => {
    return searchTerm
      ? data?.filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : data;
  }, [data, searchTerm]);

  const currentItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return filteredData?.slice(start, start + itemsPerPage) || [];
  }, [filteredData, currentPage, itemsPerPage]);

  if (isError) return <ErrorDisplay message="Failed to fetch Pokémon data." />;
  if (isLoading) return <SkeletonPokemons count={itemsPerPage} />;
  if (!filteredData || filteredData.length === 0) return <NoResultsFound />;

  const handlePageClick = (selectedItem: { selected: number }) => {
    setCurrentPage(selectedItem.selected);
  };

  return (
    <Box>
      <Flex wrap="wrap" justify="center" gap="20px">
        {currentItems.map((pokemon) => {
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
      {filteredData && (
        <Pagination
          pageCount={Math.ceil(filteredData.length / itemsPerPage)}
          onPageChange={handlePageClick}
        />
      )}
    </Box>
  );
};

export default PokemonList;
