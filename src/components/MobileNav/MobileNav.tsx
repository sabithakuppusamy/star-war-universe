import { Flex, useColorModeValue } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { MobileProps } from "../../utils/interface";

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      mt={{ base: 4, md: 0 }}
      height="20"
      alignItems="flex-start"
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <FiMenu onClick={onOpen} aria-label="open menu" />
    </Flex>
  );
};

export default MobileNav;
