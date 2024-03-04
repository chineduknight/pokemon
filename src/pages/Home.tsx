import { Box, Flex, Input, Image, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useQueryWrapper } from "services/api/apiHelper";

const Home = () => {
  const { data } = useQueryWrapper("test-key", "/type");
  const res = useQueryWrapper("test-key-2", "/type/1");
  console.log("res:--", res);

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
  const [catName, setCatName] = useState("normal");
  const handleClick = (name) => {
    setCatName(name);
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
              onClick={() => handleClick(item.name)}
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
export default Home;
