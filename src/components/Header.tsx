import React, { useState, useEffect } from "react";
import { Box, Input, Image } from "@chakra-ui/react";
import { bannerURL } from "constants/index";

type BannerProps = {
  onSearch: (searchTerm: string) => void;
};

const Header: React.FC<BannerProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(inputValue);
    }, 500); // Debounce delay of 500ms

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, onSearch]);

  return (
    <Box textAlign="center" mb="50px">
      <Image mt="40px" src={bannerURL} />
      <Box mt="20px">
        <Input
          w="300px"
          textAlign="center"
          placeholder="Search for Pokémon"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value.toLowerCase())}
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
    </Box>
  );
};

export default Header;
