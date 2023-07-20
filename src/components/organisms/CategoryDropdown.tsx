import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import React from "react";

const CategoryDropdown = ({
  group,
  groupName,
  onCategoryClick,
}: {
  group: any;
  groupName: string;
  onCategoryClick: (category: string) => void;
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      borderRadius={10}
      paddingY={1}
      paddingX={4}
      backgroundColor={"white"}
      cursor={"pointer"}
      height={"fit-content"}
    >
      <Box onClick={onToggle} borderBottom={5} borderColor={"black"}>
        {groupName}
      </Box>
      <Collapse in={isOpen}>
        {group[groupName].map((category: string, i: number) => (
          <Box
            key={i}
            onClick={() => {
              onCategoryClick(category);
            }}
            textTransform={"capitalize"}
          >
            {category.replaceAll("_", " ")}
          </Box>
        ))}
      </Collapse>
    </Box>
  );
};

export default CategoryDropdown;
