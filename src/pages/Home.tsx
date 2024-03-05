import { Box, Flex, Input, Image, useDisclosure } from "@chakra-ui/react";
import ReactPaginate from "react-paginate";
import PokemonStatsModal from "components/PokeStats";
import { bannerURL } from "constants/index";
import { useState, useEffect } from "react";
import axiosInstance from "services/api";
import { queryClient, useQueryWrapper } from "services/api/apiHelper";
import { toast } from "react-toastify";
import CategoryList from "components/CategoryList";
import PokemonList from "components/PokemonList";
const Home = () => {
  const [catData, setSelectedCatData] = useState<any>([]);
  const { data } = useQueryWrapper<any>("get-category", "/type");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const debounceDelay = 500; // Delay in milliseconds

  const itemsPerPage = 9;
  const handlePageClick = (selectedItem) => {
    setCurrentPage(selectedItem.selected);
  };
  const [displayItems, setDisplayItems] = useState([]);
  console.log("displayItems:", displayItems);
  const [isLoadingPokemon, setIsLoadingPokemon] = useState(true);
  useEffect(() => {
    if (data && data.results.length > 0) {
      const firstItem = data.results[0];
      handleClick(firstItem);
    }
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      // Filter items based on the search term
      const newFilteredItems = searchTerm
        ? catData.filter((item) => item.pokemon.name.toLowerCase().includes(searchTerm))
        : catData;

      setFilteredItems(newFilteredItems);

      // Reset to the first page when the search term changes
      setCurrentPage(0);
    }, debounceDelay);
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, debounceDelay, catData]);

  useEffect(() => {
    // Apply pagination to the filtered items
    const newPaginatedItems = filteredItems.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage,
    );

    // Update the state that holds the items to be displayed
    setDisplayItems(newPaginatedItems);
  }, [currentPage, filteredItems]); // Depend on currentPage and filteredItems

  const [selectedCat, setselectedCat] = useState("1");
  const handleClick = async (item: { name: string; url: string }) => {
    setIsLoadingPokemon(true);
    setselectedCat(item.url);
    try {
      // throw new Error("Cannot Fetch");
      // Use queryClient to fetch data
      const data = await queryClient.fetchQuery(["catData", item.url], () =>
        axiosInstance.get(item.url).then((res) => res.data),
      );
      setSelectedCatData(data.pokemon);
      setIsLoadingPokemon(false);
    } catch (error) {
      console.error("Error fetching cat data:", error);
      setIsLoadingPokemon(false);
      toast.error(`${error ?? "Error fetching category data:"}`);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
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
    <Flex mb="50px" flexDir="column" justifyContent="center" alignItems="center">
      <PokemonStatsModal isOpen={isOpen} onClose={onClose} pokemon={selectedPokemon} />
      <Image mt="40px" src={bannerURL} />
      <Box>
        <Input
          margin="40px 0  20px 0"
          w="300px"
          textAlign="center"
          placeholder="Search for Pokémon"
          onChange={handleSearchChange}
          h="38px"
          p="8px 12px"
          color="#333333"
          bg="#fff"
          type="search"
          border="1px solid #cccccc"
          _focus={{
            borderColor: "#3898EC",
            boxShadow: "none",
            outline: "none",
          }}
        />
      </Box>
      <CategoryList onSelectCategory={handleClick} />
      <PokemonList category={selectedCat} searchTerm="" onClick={handleClickPokemon} />
      {isLoadingPokemon || filteredItems.length < 1 ? null : (
        <ReactPaginate
          previousLabel={"previous"}
          nextLabel={"next"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredItems.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </Flex>
  );
};

export default Home;
