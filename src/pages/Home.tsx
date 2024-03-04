import { Box, Flex, Input, Image, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import axiosInstance from "services/api";
import { queryClient, useQueryWrapper } from "services/api/apiHelper";

const colors = [
  "#27be36",
  "#f48700",
  "#009cf4",
  "#c8703f",
  "#c8473f",
  "#92acb8",
  "#dc7b45",
  "#4b5187",
  "#b8b8b8",
  "#bb6cc8",
  "#286fc2",
  "#f19eff",
  "#b2bbdb",
  "#616163",
  "#a8dce8",
  "#c3bf95",
  "#f36d76",
  "#c6df7e",
  "#2ad13b",
  "#23ab30",
  "#ff9400",
  "#db7900",
  "#00abff",
  "#008cdb",
];
const pokemonImages = [
  "https://assets.website-files.com/619abcdecb3976863147f475/619ad7c71893d636d7bfaf6a_turtwig.png",
  "https://assets.website-files.com/619abcdecb3976863147f475/619bb32d7dfe56856da496f4_monferno.png",
  "https://assets.website-files.com/619abcdecb3976863147f475/619bb2d934b8289f7991c337_grotle.png",
  "	https://assets.website-files.com/619abcdecb3976863147f475/619bb86ea44d2644705fa5ff_Giratina.png",
];
const Home = () => {
  const [catData, setSelectedCatData] = useState<any>([]);
  const [catName, setCatName] = useState("normal");
  const { data } = useQueryWrapper<any>("test-key", "/type");
  console.log("catData:", catData);
  const handleClick = async (item: { name: string; url: string }) => {
    setCatName(item.name);
    try {
      // Use queryClient to fetch data
      const data = await queryClient.fetchQuery(["catData", item.url], () =>
        axiosInstance.get(item.url).then((res) => res.data),
      );
      setSelectedCatData(data.pokemon);
    } catch (error) {
      console.error("Error fetching cat data:", error);
      // Handle error (e.g., show a notification)
    }
  };
  const handleSearchChange = (event) => {
    // Implementation for handling search input
  };

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center">
      <Image
        mt="40px"
        src="https://fontmeme.com/permalink/211122/1a54d4d9a724da8b765b2299e0643073.png"
      />
      <Box>
        <Input
          margin="40px 0  20px 0"
          placeholder="Search for Pokémon"
          onChange={handleSearchChange}
        />
      </Box>
      <Flex width="970px" flexWrap="wrap" alignItems="center" justifyContent="center">
        {data &&
          data.results.map((item, index) => (
            <CatItem
              key={item.name}
              name={item.name}
              backgroundColor={colors[index]}
              isActive={catName === item.name}
              onClick={() => handleClick(item)}
            />
          ))}
      </Flex>
      <Flex width="1200px" flexWrap="wrap" alignItems="center" justifyContent="center">
        {catData.slice(1, 10).map((item: { pokemon: { name: string; url: string } }, index) => (
          <PokemonCard
            key={item.pokemon.name}
            name={item.pokemon.name}
            imageURL={pokemonImages[index]}
          />
        ))}
      </Flex>
    </Flex>
  );
};

type CatItemProps = {
  name: string;
  backgroundColor?: string;
  isActive?: boolean;
  onClick: () => void;
};
const CatItem = (props: CatItemProps) => {
  const { name, backgroundColor = "#27be36", isActive = false, onClick } = props;
  return (
    <Button
      variant="none"
      bg={backgroundColor}
      w="120px"
      borderRadius="5px"
      color="#fff"
      fontSize="15px"
      textAlign="center"
      textTransform="uppercase"
      fontWeight="500"
      lineHeight="1.5"
      m="8px"
      p="9px 15px"
      display="inline-block"
      opacity={isActive ? 1 : 0.6}
      onClick={onClick}
      boxShadow={isActive ? "1px 1px 7px -2px #000" : "none"}
    >
      {name}
    </Button>
  );
};
type PokemonCardType = {
  name: string;
  url?: string;
  imageURL: string;
};
const PokemonCard = (props: PokemonCardType) => {
  const { name, imageURL = pokemonImages[0] } = props;
  return (
    <Flex
      bg="#f5f5f5"
      margin="8px"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      w="320px"
      borderRadius="5px"
      transition="all 0.2s ease-in-out"
      _hover={{
        boxShadow: "1px 1px 7px -2px rgba(0, 0, 0, 0.76)",
        transform: "scale(1.01)",
      }}
    >
      <Box
        display="flex"
        width="100%"
        justifyContent="center"
        backgroundImage={`url('https://assets.website-files.com/619abba0bb2a7f61e7cf95b8/619c06178f2a8c45b4966465_pokeball.png')`}
        backgroundPosition="center"
        backgroundSize="contain"
        backgroundRepeat="no-repeat"
        backgroundAttachment="scroll"
      >
        <Image w="192px" src={imageURL} />
      </Box>

      <Box
        width="90%"
        padding="8px 0px"
        borderRadius="5px"
        backgroundColor="#fcfcfc"
        boxShadow="1px 1px 7px -2px #000"
        mb="10px"
      >
        <Heading
          as="h2"
          textTransform="capitalize"
          fontSize="32px"
          // marginBottom="20px"
          lineHeight="1.4"
          textAlign="center"
        >
          {name}
        </Heading>
      </Box>
    </Flex>
  );
};
export default Home;
