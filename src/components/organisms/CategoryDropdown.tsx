import { Box, Collapse, useDisclosure } from "@chakra-ui/react";
import React from "react";

const CategoryDropdown = ({
  group,
  groupName,
}: {
  group: any;
  groupName: string;
}) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Box
      borderRadius={10}
      paddingY={1}
      paddingX={4}
      backgroundColor={"white"}
      cursor={"pointer"}
    >
      <Box onClick={onToggle}>{groupName}</Box>
      <Collapse in={isOpen}>
        {group[groupName].map((category: string, i: number) => (
          <Box key={i}>{category}</Box>
        ))}
      </Collapse>
    </Box>
  );
};

export default CategoryDropdown;
