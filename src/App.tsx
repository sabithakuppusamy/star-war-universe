import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import People from "./pages/People/People";
import Layout from "./components/Layout/Layout";
import { Box } from "@chakra-ui/react";
import CharacterDetails from "./pages/characterDetail.tsx/CharacterDetails";
import { retrieveCharacterImageList } from "./helper/retrieveCharactersData";

export const CharacterListContext = createContext<any[]>([]);

function App() {
  const [charListWithImage, setCharListWithImage] = useState<any[]>([]);

  useEffect(() => {
    getCharactersWithImage();
  }, []);

  const getCharactersWithImage = async () => {
    let response = await retrieveCharacterImageList();

    if (response) {
      let result = response.map((char: any) => {
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
