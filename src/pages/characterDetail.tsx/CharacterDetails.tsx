import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Image,
  Text,
  Flex,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import { retrieveCharacterDetails } from "../../helper/retrieveCharactersData";
import { CharacterListContext } from "../../App";
import { GiHastyGrave, GiNewBorn, GiWorld } from "react-icons/gi";

const CharacterDetails = () => {
  const location = useLocation();
  const profileId = location.pathname.split("/").pop();
  const [charDetails, setCharDetails] = useState<any[]>([]);
  const [charImage, setCharImage] = useState("");
  const [charWiki, setCharWiki] = useState("");
  const [charPlanet, setCharPlanet] = useState("");
  const [charDied, setCharDied] = useState("");
  const [charSpecies, setCharSpecies] = useState("");
  const [charCybernatics, setCharCybernatics] = useState("");
  const [charDiedLocation, setDiedLocation] = useState("");
  const [charAffiliations, setCharAffliations] = useState("");
  const [charApprentices, setCharApprentices] = useState("");
  const [charMasters, setCharMasters] = useState("");
  const [isLoading, setLoading] = useState(false);
  const charListWithImage = useContext(CharacterListContext);

  useEffect(() => {
    setLoading(true);
    getCharacterDetails();
  }, [charListWithImage]);

  const getCharacterDetails = async () => {
    const data = await retrieveCharacterDetails(profileId);
    let imageData = charListWithImage.filter((char: any) => {
      return char.name === data.name;
    });
    if (imageData.length > 0) {
      setLoading(false);
      setCharImage(imageData[0].image);
      setCharWiki(imageData[0].wiki);
      setCharPlanet(imageData[0].homeworld);
      setCharDied(imageData[0].died || imageData[0].dateDestroyed);
      setDiedLocation(
        imageData[0].diedLocation || imageData[0].destroyedLocation
      );
      setCharSpecies(imageData[0].species);
      setCharCybernatics(imageData[0].cybernetics);
      setCharAffliations(imageData[0].affiliations.toString());
      setCharApprentices(imageData[0].apprentices.toString());
      setCharMasters(imageData[0].masters.toString());
    } else {
      setLoading(false);
    }
    setCharDetails([data]);
  };

  return (
    <Flex gap={0.5} flexDirection={"column"}>
      <Box
        w={"90%"}
        h={40}
        bg={useColorModeValue("white", "black")}
        bgSize={"400% 400%"}
        m={"3em auto"}
        borderRadius={10}
        className="shimmering-gradient"
      >
        <Text fontSize={"lg"} fontWeight={"medium"} textAlign="center" mt={4}>
          Star Wars Character Profile
        </Text>
        <Image
          src={
            charImage ||
            "https://vignette.wikia.nocookie.net/starwars/images/6/68/RattsHS.jpeg"
          }
          boxSize="150px"
          alt="stock image"
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
        className="greetings-text"
      >
        {charDetails[0]?.name}
      </Text>
      <Flex gap={8} justifyContent="center" alignItems="center" mt={4}>
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

      <Flex my={4} mx={{ base: "4", md: "16" }} flexDir="column">
        <Text
          fontWeight={"semibold"}
          fontSize={"xl"}
          textAlign={"left"}
          className="greetings-text"
          mb={2}
        >
          About
        </Text>
        <Text fontSize={"md"}>
          {`${
            charDetails[0]?.name
          } is one of the characters from Star wars. Born on ${
            charDetails[0]?.birth_year
          }. Died ${
            charDied ? `in ${charDied}` : ` `
          }at ${charDiedLocation}. Do you want to know more about ${
            charDetails[0]?.name
          }? Please follow this `}
          <Link color={"linkedin.500"} href={charWiki} target={"_blank"}>
            link.
          </Link>
        </Text>
        <Flex
          flexDir={{ base: "column", md: "row" }}
          justifyContent={"space-around"}
          my={4}
        >
          <Flex flexDir={"column"}>
            <Text
              fontWeight={"semibold"}
              fontSize={"xl"}
              textAlign={"left"}
              className="greetings-text"
              my={2}
            >
              Physical Description
            </Text>
            <Text>
              <strong>Species:</strong> {charSpecies}
            </Text>
            <Text>
              <strong>Gender: </strong>
              {charDetails[0]?.gender}
            </Text>
            <Text>
              <strong>Height: </strong>
              {`${charDetails[0]?.height} centimeters`}
            </Text>
            <Text>
              <strong>Mass: </strong>
              {`${charDetails[0]?.mass} kilograms`}
            </Text>
            <Text>
              <strong>Hair Color: </strong>
              {charDetails[0]?.hair_color}
            </Text>
            <Text>
              <strong>Skin Color: </strong>
              {charDetails[0]?.skin_color}
            </Text>
            <Text>
              <strong>Eye Color: </strong>
              {charDetails[0]?.eye_color}
            </Text>
            <Text>
              <strong>Cybernatics: </strong>
              {charCybernatics || "n/a"}
            </Text>
          </Flex>
          <Flex flexDir={"column"} maxW={"60vh"}>
            <Text
              fontWeight={"semibold"}
              fontSize={"xl"}
              textAlign={"left"}
              className="greetings-text"
              my={2}
            >
              Chronological and political information
            </Text>

            <Text>
              <strong>Affiliations: </strong>
              {charAffiliations}
            </Text>
            <Text>
              <strong>Apprentices:</strong> {charApprentices || "n/a"}
            </Text>
            <Text>
              <strong>Masters:</strong> {charMasters || "n/a"}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CharacterDetails;
