import React from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Link,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import "./card.scss";
import { FiHeart } from "react-icons/fi";
import {
  ADD_TO_FAVORITES,
  FAV_KEY,
  REMOVE_FROM_FAVORITES,
} from "../../constants";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/common";
import { CharacterFavorites } from "../../utils/interface";
import { useLocation } from "react-router-dom";

const Card = ({ character, characterList, setCharacterList }: any) => {
  //Get ID from the character URL of SWAPI response
  let characterId =
    character?.url.split("/")[character?.url.split("/").length - 2];

  const params = new URLSearchParams(useLocation().search);
  const filter = params.get("filter");

  const setFavorite = (isFavorite: boolean): void => {
    const favListString = getLocalStorageItem(FAV_KEY);
    let favList: CharacterFavorites[];
    if (favListString) {
      favList = JSON.parse(favListString);
      let existCharName = favList.filter(
        (listItem: CharacterFavorites) => listItem.name === character.name
      );
      if (existCharName.length > 0) {
        favList = favList.map((listItem: CharacterFavorites) => {
          if (listItem.name === character.name) {
            listItem.isFavorite = isFavorite;
          }
          return listItem;
        });
      } else {
        favList.push({
          name: character.name,
          isFavorite: isFavorite,
        });
      }
      setLocalStorageItem(FAV_KEY, JSON.stringify(favList));
      setCharacterList(updateCharacterList(isFavorite));
    } else {
      setLocalStorageItem(
        FAV_KEY,
        JSON.stringify([{ name: character.name, isFavorite: isFavorite }])
      );
    }
  };

  const updateCharacterList = (isFavorite: boolean): void => {
    let updateCharList = characterList.map((item: any) => {
      if (item.name === character.name) {
        item.isFavorite = isFavorite;
      }
      return item;
    });

    if (filter) {
      updateCharList = updateCharList.filter((item: any) => item.isFavorite);
    }

    return updateCharList;
  };

  const handleAddFavorites = (event: any) => {
    event.preventDefault();
    setFavorite(true);
  };

  const handleRemoveFavorites = (event: any) => {
    event.preventDefault();
    setFavorite(false);
  };

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
        justifyContent={"space-between"}
        as={Link}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
        href={`/characters/${characterId}`}
        position="relative"
      >
        <Flex
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          m={"auto 0"}
        >
          <BsFillArrowRightCircleFill size={"30"} />
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
        {character.isFavorite ? (
          <Button
            w={"full"}
            alignSelf={"flex-end"}
            size="lg"
            fontWeight={"normal"}
            fontSize={14}
            onClick={handleRemoveFavorites}
            onDoubleClick={handleRemoveFavorites}
          >
            {REMOVE_FROM_FAVORITES}
            <FiHeart fill={"red"} color="red" style={{ marginLeft: 8 }} />
          </Button>
        ) : (
          <Button
            w={"full"}
            alignSelf={"flex-end"}
            size="lg"
            fontWeight={"normal"}
            fontSize={14}
            onClick={handleAddFavorites}
            onDoubleClick={handleAddFavorites}
          >
            {ADD_TO_FAVORITES}
            <FiHeart style={{ marginLeft: 8 }} />
          </Button>
        )}
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
                color={character.isFavorite ? "red" : "none"}
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
