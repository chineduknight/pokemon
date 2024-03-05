import { Flex, Heading, Box, Image } from "@chakra-ui/react";
import { pokemonImages } from "constants/index";

type PokemonCardType = {
  name: string;
  imageURL: string;
  onClick: (item) => void;
};
const PokemonCard = (props: PokemonCardType) => {
  const { name, imageURL = pokemonImages[0], onClick } = props;
  return (
    <Flex
      onClick={onClick}
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

export default PokemonCard;
