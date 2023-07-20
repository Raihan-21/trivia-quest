import { Box, Collapse, Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";

import { motion } from "framer-motion";
import { GoChevronRight } from "react-icons/go";

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
      <Flex
        onClick={onToggle}
        borderBottom={5}
        borderColor={"black"}
        justifyContent={"space-between"}
        alignItems={"center"}
        columnGap={1}
      >
        {groupName}
        <motion.div animate={{ rotateZ: isOpen ? 90 : 0 }}>
          <GoChevronRight />
        </motion.div>
      </Flex>
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
