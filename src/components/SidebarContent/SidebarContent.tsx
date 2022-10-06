import React from "react";
import { useColorModeValue, Flex, CloseButton, Box } from "@chakra-ui/react";
import NavItem from "../NavItem/NavItem";
import { FaUserAlt } from "react-icons/fa";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";
import { LinkItemProps, SidebarProps } from "../../utils/interface";
import { ESidebarMenu, ESidebarRoute } from "../../constants";

const ListItems: Array<LinkItemProps> = [
  {
    name: ESidebarMenu.CHARACTERS,
    icon: FaUserAlt,
    route: ESidebarRoute.CHARACTERS,
  },
  {
    name: ESidebarMenu.FAVORITES,
    icon: BsFillEmojiHeartEyesFill,
    route: ESidebarRoute.FAVORITES,
  },
];

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "black")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      mt={{ base: "0", md: "8" }}
      {...rest}
    >
      <Flex
        h="20"
        alignItems="center"
        mx="4"
        justifyContent="space-between"
        display={{ base: "flex", md: "none" }}
      >
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {ListItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.route}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

export default SidebarContent;
