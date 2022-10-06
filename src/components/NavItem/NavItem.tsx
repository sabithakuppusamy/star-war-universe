import React, { ReactNode } from "react";
import {
  FlexProps,
  List,
  Flex,
  Icon,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import "./NavItem.scss";
import { IconType } from "react-icons";

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  path: string;
}
const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  return (
    <List
      as={Link}
      to={path}
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      mt={4}
    >
      <Flex
        align="center"
        p="4"
        role="group"
        cursor="pointer"
        className="side-bar-list"
        ml={{ base: "4", md: "0" }}
        _hover={{
          color: useColorModeValue("white", "black"),
        }}
        {...rest}
      >
        <Icon
          mr="4"
          fontSize="16"
          _hover={{
            color: useColorModeValue("white", "black"),
          }}
          as={icon}
        />
        {children}
      </Flex>
    </List>
  );
};
export default NavItem;
