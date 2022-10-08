import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import People from "./pages/People/People";
import Layout from "./components/Layout/Layout";
import { Box } from "@chakra-ui/react";
import CharacterDetails from "./pages/CharacterDetails/CharacterDetails";
import { retrieveCharacterImageList } from "./helper/retrieveCharactersData";
import { FAV_KEY } from "./constants";
import { CharacterFavorites } from "./utils/interface";
import { getLocalStorageItem } from "./utils/common";

export const CharacterListContext = createContext<any[]>([]);

function App() {
  const [charListWithImage, setCharListWithImage] = useState<any[]>([]);
  let favoriteList: CharacterFavorites[] | null = null;

  useEffect(() => {
    getCharactersWithImage();
  }, []);

  const getFavoritesFromLocal = (): void => {
    const favs = getLocalStorageItem(FAV_KEY);
    if (favs) {
      favoriteList = JSON.parse(favs);
    } else {
      favoriteList = null;
    }
  };

  const getCharactersWithImage = async () => {
    getFavoritesFromLocal();
    let response = await retrieveCharacterImageList();
    if (response) {
      let result;
      if (favoriteList) {
        result = response.map((char: any) => {
          let favorites = favoriteList?.filter(
            (item: CharacterFavorites) => item.name === char.name
          );
          return {
            ...char,
            isFavorite: favorites ? favorites[0]?.isFavorite : false,
          };
        });
      } else {
        result = response.map((char: any) => {
          return {
            ...char,
            isFavorite: false,
          };
        });
      }
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
