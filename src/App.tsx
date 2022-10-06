import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import People from "./pages/People/People";
import Layout from "./components/Layout/Layout";
import { Box } from "@chakra-ui/react";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetails";
import { retrieveCharacterImageList } from "./helper/retrieveCharactersData";
import { CharacterWithImage } from "./utils/interface";

export const CharacterListContext = createContext<CharacterWithImage[]>([]);

function App() {
  const [charListWithImage, setCharListWithImage] = useState<
    CharacterWithImage[]
  >([]);

  useEffect(() => {
    getCharactersWithImage();
  }, []);

  const getCharactersWithImage = async () => {
    let response = await retrieveCharacterImageList();

    if (response) {
      let result = response.map((char: CharacterWithImage) => {
        return {
          ...char,
          isFavorite: false,
        };
      });
      setCharListWithImage(result);
    }
  };

  return (
    <CharacterListContext.Provider value={charListWithImage}>
      <Layout>
        <Box>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<People />}></Route>
              <Route index element={<People />} />
              <Route path="/characters" element={<People />} />
              <Route path="/characters/:id" element={<CharacterDetails />} />
            </Routes>
          </BrowserRouter>
        </Box>
      </Layout>
    </CharacterListContext.Provider>
  );
}

export default App;
