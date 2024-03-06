import { Flex } from "@chakra-ui/react";
import { colors } from "constants/index";
import { useQueryWrapper } from "services/api/apiHelper";
import CategoryItem from "./CategoryItem";
import { SkeletonCategories, ErrorDisplay } from "./Loader";
import { useState } from "react";

type CategoryListProps = {
  onSelectCategory: (item) => void;
};

const CategoryList = ({ onSelectCategory }: CategoryListProps) => {
  const { data, isLoading, isError, error }: any = useQueryWrapper("get-category", "/type");
  const [catName, setCatName] = useState("normal");

  if (isLoading) return <SkeletonCategories />;
  if (isError) return <ErrorDisplay message={error.message} />;

  return (
    <Flex maxWidth="970px" flexWrap="wrap" alignItems="center" justifyContent="center">
      {data.results.map((item, index) => (
        <CategoryItem
          key={item.name}
          name={item.name}
          backgroundColor={colors[index % colors.length]}
          isActive={catName === item.name}
          onClick={() => {
            setCatName(item.name);
            onSelectCategory(item);
          }}
        />
      ))}
    </Flex>
  );
};

export default CategoryList;
