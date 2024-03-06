import { Flex, useDisclosure } from "@chakra-ui/react";
import PokemonStatsModal from "components/Pokemon/PokeStats";
import { useState } from "react";
import CategoryList from "components/CategoryList";
import PokemonList from "components/Pokemon/PokemonList";
import Header from "components/Header";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setselectedCat] = useState("1");
  const handleClick = async (item: { name: string; url: string }) => {
    setselectedCat(item.url);
  };

  const handleSearchChange = (searchValue) => {
    setSearchTerm(searchValue);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedPokemon, setSelectedPokemon] = useState({
    pokemonDetails: {
      name: "",
      url: "",
    },
    imageURL: "",
  });
  const handleClickPokemon = (selectPokemon, imageURL) => {
    setSelectedPokemon({
      pokemonDetails: {
        name: selectPokemon.name,
        url: selectPokemon.url,
      },
      imageURL,
    });
    onOpen();
  };
  return (
    <Flex
      mb="50px"
      // bg="#DCEDC8"
      // minH="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <PokemonStatsModal isOpen={isOpen} onClose={onClose} pokemon={selectedPokemon} />
      <Header onSearch={handleSearchChange} />
      <CategoryList onSelectCategory={handleClick} />
      <PokemonList category={selectedCat} searchTerm={searchTerm} onClick={handleClickPokemon} />
    </Flex>
  );
};

export default Home;
