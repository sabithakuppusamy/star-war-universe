import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import "./Card.scss";

const Card = ({ character }: any) => {
  //Get ID from the character URL of SWAPI response
  let characterId =
    character?.url.split("/")[character?.url.split("/").length - 2];
  return (
    <Box
      h={"auto"}
      p={5}
      minW={{ base: "64", md: "72" }}
      borderRadius={"5px"}
      as="article"
      bg={useColorModeValue("white", "black")}
      boxShadow={"2xl"}
      className="card"
    >
      <Flex
        className="content-overlay"
        bg={useColorModeValue("#ffffffe6", "#000000cc")}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        as={Link}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        href={`/characters/${characterId}`}
        position="relative"
      >
        <BsFillArrowRightCircleFill size={36} />
        <Text
          mt={4}
          fontSize={20}
          fontWeight={"bold"}
          as={Link}
          style={{ textDecoration: "none" }}
          _focus={{ boxShadow: "none" }}
          href={`/characters/${characterId}`}
        >
          View details
        </Text>
      </Flex>

      <Image
        src={character?.image}
        boxSize="150px"
        alt="stock image"
        borderRadius="full"
        m={"15px auto"}
        boxShadow={"lg"}
        fit={"fill"}
      />
      <Box h={"30%"} mt={4}>
        <Text
          fontWeight={"semibold"}
          fontSize={"xl"}
          textAlign={"center"}
          className="greetings-text"
        >
          {character?.name}
        </Text>
        <Flex flexDir={"row"} justifyContent={"space-between"} my={4}>
          <Box>
            <Text casing={"capitalize"}> Gender : {character.gender}</Text>
            <Text casing={"capitalize"}> Planet : {character.planet}</Text>
          </Box>
          <IconButton
            icon={
              <FiHeart
                fill={character.isFavorite ? "red" : "none"}
                color={character.isFavorite ? "red" : "white"}
              />
            }
            aria-label="Favorites"
            isRound={true}
          />
        </Flex>
      </Box>
    </Box>
  );
};

export default Card;
