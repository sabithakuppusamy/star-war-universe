import React from "react";
import {
  BoxProps,
  useColorModeValue,
  Flex,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import NavItem from "../NavItem/NavItem";
import { IconType } from "react-icons";
import { FaUserAlt } from "react-icons/fa";
import { BsFillEmojiHeartEyesFill } from "react-icons/bs";

interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}
const ListItems: Array<LinkItemProps> = [
  { name: "People", icon: FaUserAlt, route: "/characters" },
  {
    name: "Favorites",
    icon: BsFillEmojiHeartEyesFill,
    route: "/characters?filter=favorites",
  },
];

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

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
