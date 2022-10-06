import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Heading,
  Spinner,
  Wrap,
  WrapItem,
  Text,
  Button,
  Flex,
  Input,
  InputGroup,
  Box,
  InputRightElement,
} from "@chakra-ui/react";
import Card from "../../components/Card/Card";
import axios from "axios";
import {
  retrieveCharacterList,
  retrieveSearchedCharacters,
} from "../../helper/retrieveCharactersData";
import getData from "../../utils/api";
import { FiSearch } from "react-icons/fi";
import "./People.scss";
import { LoadingCard } from "../../components/Card/LoadingCard";
import { CharacterListContext } from "../../App";
import { useLocation } from "react-router-dom";
import { CharacterWithImage, StarWarCharacters } from "../../utils/interface";
import { LOAD_MORE, PLACEHOLDER_IMAGE, SCROLL_TOP } from "../../constants";

const People = () => {
  const [characterList, setCharacterList] = useState<StarWarCharacters[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [greetingsText, setGreetingsText] = useState("Good Day!");
  const [page, setPage] = useState();
  const [isLoadMore, setIsLoadMore] = useState(false);
  const charListWithImage = useContext(CharacterListContext);
  const params = new URLSearchParams(useLocation().search);
  const filter = params.get("filter");

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      if (charListWithImage) {
        getGreetingText();
        getCharacters();
        setLoading(false);
      } else {
        setLoading(true);
      }
    }, 1000);
  }, [charListWithImage]);

  const getGreetingText = (): void => {
    const today = new Date();
    const curHr = today.getHours();

    if (curHr < 12) {
      setGreetingsText("Good Morning!");
    } else if (curHr < 18) {
      setGreetingsText("Good Afternoon!");
    } else {
      setGreetingsText("Good Evening!");
    }
  };

  const getCharacters = async (searchTerm: string | null = null) => {
    let response;
    if (searchTerm) {
      response = await retrieveSearchedCharacters(searchTerm);
    } else {
      response = await retrieveCharacterList();
    }
    setPage(response.next);
    let result = await mapCharactersWithImage(response.results);
    if (result) {
      if (filter) {
        result = result?.filter((item: any) => {
          return item.isFavorite === true;
        });
      }
      setCharacterList(result);
    }
  };

  const mapCharactersWithImage = async (response: StarWarCharacters[]) => {
    if (charListWithImage) {
      let result = response.map((char: StarWarCharacters) => {
        let a = charListWithImage.filter((item: CharacterWithImage) => {
          return item.name === char.name;
        });
        return {
          ...char,
          image: a[0]?.image || PLACEHOLDER_IMAGE,
          planet: a[0]?.homeworld,
          isFavorite: a[0]?.isFavorite,
        };
      });
      return result;
    }
  };

  const handleLoadMore = async () => {
    if (page) {
      setIsLoadMore(true);
      const response = await getData(page);
      setPage(response.next);
      let result = await mapCharactersWithImage(response.results);
      if (result) {
        setCharacterList([...characterList, ...result]);
        setIsLoadMore(false);
      }
    }
  };

  const handleScrollTop = () => {
    window.scrollTo(0, 0);
  };

  const handleOnInput = (event: any) => {
    setTimeout(() => {
      getCharacters(event.target.value);
    }, 1000);
  };

  return (
    <>
      <Heading size="lg" fontWeight={"thin"} m={4} mt={10}>
        <Flex w={"100%"} justifyContent={"space-between"}>
          <Box>
            Hello, <span className="greetings-text">{greetingsText} </span>
            <Text fontSize={"lg"} mt={2}>
              Welcome to the Star Wars Universe!
            </Text>
          </Box>
          <InputGroup display={{ base: "none", md: "block" }} w={"30%"}>
            <Input
              placeholder="Search character name"
              variant="flushed"
              className="sw-search"
              onKeyDown={handleOnInput}
            />
            <InputRightElement children={<FiSearch />} />
          </InputGroup>
        </Flex>

        <InputGroup mt={4} display={{ base: "block", md: "none" }} w={"95 %"}>
          <Input
            placeholder="Search character name"
            variant="flushed"
            className="sw-search"
            onKeyDown={handleOnInput}
          />
          <InputRightElement children={<FiSearch />} />
        </InputGroup>
      </Heading>
      {isLoading ? (
        <Flex
          w={"100%"}
          h={"60vh"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner
            thickness="5px"
            speed="0.65s"
            emptyColor="gray.900"
            color="orange.500"
            size="xl"
          />
        </Flex>
      ) : (
        <>
          {characterList.length === 0 && filter && (
            <Heading w={"100%"} textAlign={"center"} mt={"20vh"}>
              Coming soon...
            </Heading>
          )}

          <Wrap spacing={"40px"} p={"12"} align="center" justify={"center"}>
            {characterList.map((character, index) => (
              <WrapItem key={index}>
                <Card character={character} />
              </WrapItem>
            ))}
            {isLoadMore && <LoadingCard />}
          </Wrap>
          {!(characterList.length < 10) && (
            <Flex justifyContent={"center"} alignItems={"center"} mb={8}>
              {characterList.length < 82 ? (
                <Button
                  fontWeight={"thin"}
                  colorScheme="orange"
                  variant="outline"
                  onClick={handleLoadMore}
                >
                  {LOAD_MORE}
                </Button>
              ) : (
                <Button
                  fontWeight={"thin"}
                  colorScheme="yellow"
                  variant="outline"
                  onClick={handleScrollTop}
                >
                  {SCROLL_TOP}
                </Button>
              )}
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default People;
