import React, { ReactNode } from "react";
import {
  IconButton,
  Box,
  Flex,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  useColorMode,
  Spacer,
  VStack,
  Image,
} from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";
import MobileNav from "../MobileNav/MobileNav";
import SidebarContent from "../SidebarContent/SidebarContent";

export default function Layout({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkTheme = colorMode === "dark";

  return (
    <Box minH={"100vh"} overflow="hidden">
      <VStack>
        <Flex
          w="100%"
          h="4em"
          p="3"
          position={"fixed"}
          zIndex={999}
          bg={useColorModeValue("white", "black")}
        >
          <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
          <Image
            _hover={{
              transform: "scale(1.1)",
              transition: " transform 0.5s",
            }}
            fontSize={10}
            src="/starwars.png"
            alt="Logo"
            width={"8em"}
            boxShadow={"inner"}
          />
          <Spacer />
          <IconButton
            mr={3}
            icon={isDarkTheme ? <FaSun /> : <FaMoon />}
            aria-label={"theme"}
            isRound={true}
            title={
              isDarkTheme ? "Change to light theme" : "Change to dark theme"
            }
            onClick={toggleColorMode}
          />
        </Flex>
      </VStack>
      <Box
        minH="100vh"
        bg={useColorModeValue("gray.100", "blackAlpha.600")}
        mt={30}
      >
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
}
