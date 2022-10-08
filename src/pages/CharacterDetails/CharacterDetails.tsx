import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Flex,
  Link,
  useColorModeValue,
  Tag,
  Wrap,
  WrapItem,
  Button,
  IconButton,
} from "@chakra-ui/react";
import {
  getFilmsAndStarshipData,
  retrieveCharacterDetails,
} from "../../helper/retrieveCharactersData";
import { CharacterListContext } from "../../App";
import { GiHastyGrave, GiNewBorn, GiWorld } from "react-icons/gi";
import { CharacterFavorites, StarWarCharacters } from "../../utils/interface";
import {
  ADD_TO_FAVORITES,
  FAV_KEY,
  FILMS,
  PLACEHOLDER_IMAGE,
  REMOVE_FROM_FAVORITES,
  STARSHIPS,
} from "../../constants";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/common";
import { FiHeart } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";

const CharacterDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileId = location.pathname.split("/").pop();
  const [charDetails, setCharDetails] = useState<StarWarCharacters[]>([]);
  const [charImage, setCharImage] = useState("");
  const [charWiki, setCharWiki] = useState("");
  const [charPlanet, setCharPlanet] = useState("");
  const [charDied, setCharDied] = useState<string | undefined>("");
  const [charSpecies, setCharSpecies] = useState("");
  const [charCybernetics, setcharCybernetics] = useState("");
  const [charDiedLocation, setDiedLocation] = useState<string | undefined>("");
  const [charAffiliations, setCharAffliations] = useState("");
  const [charApprentices, setCharApprentices] = useState("");
  const [charMasters, setCharMasters] = useState("");
  const charListWithImage = useContext(CharacterListContext);
  const [charFilms, setCharFilms] = useState<string[]>([]);
  const [charStarships, setCharStarships] = useState<string[]>([]);
  const [isCharFavorite, setIsCharFavorite] = useState(false);

  useEffect(() => {
    if (charListWithImage) {
      getCharacterDetails();
      getCharFavDetails();
    }
  }, [charListWithImage]);

  const getFavListFromLocal = (): CharacterFavorites[] => {
    const favListString = getLocalStorageItem(FAV_KEY);
    let favList: CharacterFavorites[];
    const defaultValue = [{ name: charDetails[0]?.name, isFavorite: false }];
    if (favListString) {
      favList = JSON.parse(favListString);
      const characterFavDetails = favList.filter(
        (favItem: CharacterFavorites) => favItem?.name === charDetails[0]?.name
      );
      return characterFavDetails || defaultValue;
    } else {
      return defaultValue;
    }
  };

  const getCharFavDetails = (): void => {
    let favList = getFavListFromLocal();
    setIsCharFavorite(favList[0]?.isFavorite);
  };

  const extractFilmsOrStarship = (
    groupResponseData: any,
    type: string
  ): string[] => {
    let result: string[] = [];
    groupResponseData.forEach((response: any) => {
      result.push(type === FILMS ? response.data.title : response.data.name);
    });
    return result;
  };

  const setCharacterFilmData = async (data: string[]) => {
    const filmsDataGroupResponse = await getFilmsAndStarshipData(data);

    if (filmsDataGroupResponse) {
      setCharFilms(extractFilmsOrStarship(filmsDataGroupResponse, FILMS));
    }
  };

  const setCharacterStarshipData = async (data: any) => {
    let charactersDataGroupResponse = await getFilmsAndStarshipData(data);

    if (charactersDataGroupResponse) {
      setCharStarships(
        extractFilmsOrStarship(charactersDataGroupResponse, STARSHIPS)
      );
    }
  };

  const getCharacterDetails = async () => {
    const data = await retrieveCharacterDetails(profileId);
    if (data) {
      if (charFilms.length === 0) setCharacterFilmData(data.films);
      if (charStarships.length === 0) setCharacterStarshipData(data.starships);

      let imageData = charListWithImage.filter((char: any) => {
        return char.name === data.name;
      });
      if (imageData.length > 0) {
        setCharImage(imageData[0].image);
        setCharWiki(imageData[0].wiki);
        setCharPlanet(imageData[0].homeworld);
        setCharDied(imageData[0].died || imageData[0].dateDestroyed);
        setDiedLocation(
          imageData[0].diedLocation || imageData[0].destroyedLocation
        );
        setCharSpecies(imageData[0].species);
        setcharCybernetics(imageData[0].cybernetics);
        setCharAffliations(imageData[0].affiliations?.toString());
        setCharApprentices(imageData[0].apprentices?.toString());
        setCharMasters(imageData[0].masters?.toString());
      }
      setCharDetails([data]);
    }
  };
  const setOrRemoveFavorite = (isFavorite: boolean): void => {
    const favListString = getLocalStorageItem(FAV_KEY);
    let favList: CharacterFavorites[];
    if (favListString) {
      favList = JSON.parse(favListString);
      let existCharName = favList.filter(
        (listItem: CharacterFavorites) => listItem.name === charDetails[0].name
      );
      if (existCharName.length > 0) {
        favList = favList.map((listItem: CharacterFavorites) => {
          if (listItem.name === charDetails[0].name) {
            listItem.isFavorite = isFavorite;
          }
          return listItem;
        });
      } else {
        favList.push({
          name: charDetails[0].name,
          isFavorite: isFavorite,
        });
      }
      setLocalStorageItem(FAV_KEY, JSON.stringify(favList));
      setIsCharFavorite(isFavorite);
    } else {
      setLocalStorageItem(
        FAV_KEY,
        JSON.stringify([{ name: charDetails[0]?.name, isFavorite: isFavorite }])
      );
      setIsCharFavorite(isFavorite);
    }
  };

  const handleAddFavorites = (_event: any) => {
    setOrRemoveFavorite(true);
  };

  const handleRemoveFavorites = (_event: any) => {
    setOrRemoveFavorite(false);
  };

  const goBack = (_event: any) => {
    navigate(-1);
  };

  return (
    <Flex gap={0.5} flexDirection={"column"}>
      <Box
        position={"relative"}
        w={"90%"}
        h={40}
        bg={useColorModeValue("white", "black")}
        bgSize={"400% 400%"}
        m={"3em auto"}
        borderRadius={10}
        className="shimmering-gradient"
      >
        <IconButton
          position={"absolute"}
          top={4}
          left={4}
          isRound={true}
          size={"lg"}
          icon={<FaArrowLeft />}
          onClick={goBack}
          aria-label={"back-button"}
        />
        <Text fontSize={"lg"} fontWeight={"thin"} textAlign="center" mt={4}>
          Star Wars Character Profile
        </Text>
        <Box position={"absolute"} right={4} bottom={4}>
          {isCharFavorite ? (
            <Button
              alignSelf={"flex-end"}
              colorScheme="yellow"
              variant={"outline"}
              size="sm"
              fontWeight={"medium"}
              onClick={handleRemoveFavorites}
            >
              {REMOVE_FROM_FAVORITES}
              <FiHeart fill={"red"} color="red" style={{ marginLeft: 8 }} />
            </Button>
          ) : (
            <Button
              alignSelf={"flex-end"}
              colorScheme="yellow"
              variant={"outline"}
              size="sm"
              fontWeight={"medium"}
              onClick={handleAddFavorites}
            >
              {ADD_TO_FAVORITES}
              <FiHeart style={{ marginLeft: 8 }} />
            </Button>
          )}
        </Box>
        <Image
          src={charImage || PLACEHOLDER_IMAGE}
          boxSize="150px"
          alt="Profile"
          borderRadius="full"
          m={"15px auto"}
          boxShadow={"lg"}
          fit={"fill"}
        />
      </Box>

      <Text
        fontWeight={"semibold"}
        fontSize={"2xl"}
        textAlign={"center"}
        className="charDetails-text"
      >
        {charDetails[0]?.name}
      </Text>
      <Flex gap={8} justifyContent="center" alignItems="center">
        {charPlanet && (
          <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
            <GiWorld />
            <Text textAlign="center" casing={"capitalize"}>
              {charPlanet}
            </Text>
          </Flex>
        )}
        {charDetails[0]?.birth_year && (
          <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
            <GiNewBorn />
            <Text textAlign="center">{charDetails[0]?.birth_year} </Text>
          </Flex>
        )}
        {charDied && (
          <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
            <GiHastyGrave /> <Text textAlign="center">{charDied} </Text>
          </Flex>
        )}
      </Flex>

      <Flex mx={{ base: "4", md: "16" }} flexDir="column" gap={"6"}>
        <Flex flexDir={"column"}>
          <Text
            fontWeight={"semibold"}
            fontSize={"xl"}
            textAlign={"left"}
            className="charDetails-text"
            mb={2}
          >
            About
          </Text>
          <Text fontSize={"md"}>
            {`${
              charDetails[0]?.name
            } is one of the characters from Star wars. ${
              charDetails[0]?.birth_year !== "unknown"
                ? `Born on ${charDetails[0]?.birth_year}.`
                : ` `
            } ${charDied ? ` Died in ${charDied}` : ` `} ${
              charDiedLocation ? `at ${charDiedLocation}.` : ``
            } Do you want to know more about ${
              charDetails[0]?.name
            }? Please follow this `}
            <Link color={"linkedin.500"} href={charWiki} target={"_blank"}>
              link.
            </Link>
          </Text>
        </Flex>

        <Flex flexDir={"column"}>
          <Text
            fontWeight={"semibold"}
            fontSize={"xl"}
            textAlign={"left"}
            className="charDetails-text"
            mb={2}
          >
            Films
          </Text>
          <Wrap spacing={4}>
            {charFilms.length === 0 && <Text>No data</Text>}
            {charFilms.map((film: string) => (
              <WrapItem key={film}>
                <Tag
                  size={"lg"}
                  key={film}
                  colorScheme="yellow"
                  p={2}
                  w={"auto"}
                >
                  {film}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>

        <Flex flexDir={"column"}>
          <Text
            fontWeight={"semibold"}
            fontSize={"xl"}
            textAlign={"left"}
            className="charDetails-text"
            mb={2}
          >
            Starships
          </Text>
          <Wrap spacing={4}>
            {charStarships.length === 0 && <Text>No data</Text>}
            {charStarships.map((starship: string) => (
              <WrapItem key={starship}>
                <Tag
                  size={"lg"}
                  key={starship}
                  colorScheme="yellow"
                  p={2}
                  w={"auto"}
                >
                  {starship}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Flex>

        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent={"space-around"}
        >
          <Flex flexDir={"column"}>
            <Text
              fontWeight={"semibold"}
              fontSize={"xl"}
              textAlign={"left"}
              className="charDetails-text"
              my={2}
            >
              Physical Description
            </Text>
            <Text casing={"capitalize"}>
              <strong>Species:</strong> {charSpecies}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Gender: </strong>
              {charDetails[0]?.gender}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Height: </strong>
              {`${charDetails[0]?.height} centimeters`}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Mass: </strong>
              {`${charDetails[0]?.mass} kilograms`}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Hair Color: </strong>
              {charDetails[0]?.hair_color}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Skin Color: </strong>
              {charDetails[0]?.skin_color}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Eye Color: </strong>
              {charDetails[0]?.eye_color}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Cybernetics: </strong>
              {charCybernetics || "n/a"}
            </Text>
          </Flex>
          <Flex flexDir={"column"} maxW={"60vh"}>
            <Text
              fontWeight={"semibold"}
              fontSize={"xl"}
              textAlign={"left"}
              className="charDetails-text"
              my={2}
            >
              Chronological and political information
            </Text>

            <Text casing={"capitalize"}>
              <strong>Affiliations: </strong>
              {charAffiliations}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Apprentices:</strong> {charApprentices || "n/a"}
            </Text>
            <Text casing={"capitalize"}>
              <strong>Masters:</strong> {charMasters || "n/a"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CharacterDetails;
