import { Button } from "@chakra-ui/react";

type CategoryItemProps = {
  name: string;
  backgroundColor: string;
  isActive: boolean;
  onClick: () => void;
};
const CategoryItem = (props: CategoryItemProps) => {
  const { name, backgroundColor, isActive = false, onClick } = props;
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

export default CategoryItem;
