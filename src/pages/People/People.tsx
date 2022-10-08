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
  IconButton,
} from "@chakra-ui/react";
import Card from "../../components/Card/Card";
import axios from "axios";
import {
  retrieveCharacterList,
  retrieveSearchedCharacters,
} from "../../helper/retrieveCharactersData";
import { getData } from "../../utils/api";
import { FiSearch } from "react-icons/fi";
import "./People.scss";
import { LoadingCard } from "../../components/Card/LoadingCard";
import { CharacterListContext } from "../../App";
import { useLocation } from "react-router-dom";
import { CharacterWithImage, StarWarCharacters } from "../../utils/interface";
import {
  LOAD_MORE,
  NO_FAV_TEXT,
  PLACEHOLDER_IMAGE,
  PLACEHOLDER_SEARCH_TEXT,
  SCROLL_TOP,
} from "../../constants";
import { BsArrowBarUp } from "react-icons/bs";

const People = () => {
  const sourceReference = useRef(axios.CancelToken.source());
  const [characterList, setCharacterList] = useState<StarWarCharacters[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [greetingsText, setGreetingsText] = useState("Good Day!");
  const [page, setPage] = useState();
  const [isLoadMore, setIsLoadMore] = useState(false);
  const charListWithImage = useContext(CharacterListContext);
  const params = new URLSearchParams(useLocation().search);
  const filter = params.get("filter");
  const [noLoadMoreData, setNoLoadMoreData] = useState(false);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    setLoading(true);
    const source = sourceReference.current;
    if (charListWithImage) {
      getGreetingText();
      if (searchWord) {
        getCharacters(searchWord);
      } else {
        getCharacters();
      }
    } else {
      setLoading(true);
    }
    return () => {
      if (source) {
        source.cancel("People Component got unmounted");
      }
      setCharacterList([]);
    };
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
    setLoading(true);
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
      setLoading(false);
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
        if (filter) {
          result = result?.filter((item: any) => {
            return item.isFavorite === true;
          });
        }
        setCharacterList([...characterList, ...result]);
        if (result.length === 0) {
          setNoLoadMoreData(true);
        }
        setIsLoadMore(false);
      }
    } else {
      setNoLoadMoreData(true);
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleOnInput = (event: any) => {
    setTimeout(() => {
      setSearchWord(event.target.value);
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
          {!filter && (
            <InputGroup display={{ base: "none", md: "block" }} w={"30%"}>
              <Input
                placeholder={PLACEHOLDER_SEARCH_TEXT}
                variant="flushed"
                className="sw-search"
                onKeyDown={handleOnInput}
                defaultValue={searchWord}
              />
              <InputRightElement children={<FiSearch />} />
            </InputGroup>
          )}
        </Flex>

        {!filter && (
          <InputGroup mt={4} display={{ base: "block", md: "none" }} w={"95 %"}>
            <Input
              placeholder={PLACEHOLDER_SEARCH_TEXT}
              variant="flushed"
              className="sw-search"
              onKeyDown={handleOnInput}
            />
            <InputRightElement children={<FiSearch />} />
          </InputGroup>
        )}
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
            <Text w={"100%"} textAlign={"center"} mt={"20vh"}>
              {NO_FAV_TEXT}
            </Text>
          )}

          <Wrap spacing={"40px"} p={"12"} align="center" justify={"center"}>
            {characterList.map((character, index) => (
              <WrapItem key={index}>
                <Card
                  character={character}
                  characterList={characterList}
                  setCharacterList={setCharacterList}
                />
              </WrapItem>
            ))}
            {isLoadMore && <LoadingCard />}
          </Wrap>
          {characterList.length !== 0 && !noLoadMoreData && (
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              mb={8}
              position={"relative"}
            >
              {characterList.length < 82 && (
                <Button
                  fontWeight={"thin"}
                  colorScheme="orange"
                  variant="outline"
                  onClick={handleLoadMore}
                >
                  {LOAD_MORE}
                </Button>
              )}
              {window.scrollY > 20 && (
                <IconButton
                  icon={<BsArrowBarUp />}
                  aria-label={"scroll-to-top"}
                  size={"lg"}
                  position={"fixed"}
                  right={8}
                  bottom={8}
                  isRound={true}
                  colorScheme="orange"
                  onClick={handleScrollTop}
                />
              )}
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default People;
