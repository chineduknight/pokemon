import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  Grid,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useQueryWrapper } from "services/api/apiHelper";
import { extractNumberFromUrl } from "utils/helper";
type PokemonInfo = {
  pokemonDetails: {
    name: string;
    url: string;
  };
  imageURL: string;
};

type PokemonStatsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  pokemon: PokemonInfo;
};
type StatType = {
  base_stat: string;
  stat: {
    name: string;
  };
};
const PokemonStatsModal = ({ isOpen, onClose, pokemon }: PokemonStatsModalProps) => {
  const [stats, setStats] = useState<StatType[]>([]);
  const { pokemonDetails, imageURL } = pokemon;

  const pokemonNo = extractNumberFromUrl(pokemonDetails.url);
  const { refetch, isFetching } = useQueryWrapper<any>(
    "get-pokemon-info",
    `/pokemon/${pokemonNo}`,
    {
      enabled: false,
      onSuccess(data) {
        setStats(data.stats);
      },
    },
  );
  useEffect(() => {
    if (pokemonNo) {
      refetch();
    }
  }, [pokemonNo]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent bg="orange.50" borderRadius="lg">
        <ModalHeader
          display="flex"
          textTransform="capitalize"
          justifyContent="center"
          fontSize="2xl"
          color="orange.800"
        >
          {pokemonDetails.name}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex direction="column" align="center" justify="center" py={4}>
            <Image
              src={imageURL}
              alt={pokemonDetails.name}
              boxSize="150px"
              objectFit="cover"
              borderRadius="full"
              border="4px"
              borderColor="orange.200"
              mb={4}
            />
            <Grid
              textAlign="center"
              gridTemplateColumns="repeat(3,1fr)"
              gap="16px"
              justifyContent="space-between"
            >
              {isFetching
                ? // Display Skeleton components as placeholders when loading
                  Array.from({ length: 6 }).map((_, index) => (
                    <Box
                      key={index}
                      padding="4"
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <Skeleton height="20px" width="100px" mb="2" /> {/* Adjust width as needed */}
                      <Skeleton height="20px" width="50px" /> {/* Adjust width as needed */}
                    </Box>
                  ))
                : stats.map((statItem) => (
                    <Stat key={statItem.stat.name}>
                      <StatLabel color="orange.600">{statItem.stat.name.toUpperCase()}</StatLabel>
                      <StatNumber color="orange.800">{statItem.base_stat}</StatNumber>
                    </Stat>
                  ))}
            </Grid>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PokemonStatsModal;
