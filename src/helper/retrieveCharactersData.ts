import {
  CHARACTER_IMAGE_URL,
  PEOPLE_SEARCH_URL,
  PEOPLE_URL,
} from "../constants";
import getData from "../utils/api";

export const retrieveCharacterList = async () => await getData(PEOPLE_URL);

export const retrieveCharacterImageList = async () =>
  await getData(CHARACTER_IMAGE_URL);

export const retrieveCharacterDetails = async (id: string | undefined) =>
  await getData(`${PEOPLE_URL}/${id}`);

export const retrieveSearchedCharacters = async (searchTerm: string) =>
  await getData(`${PEOPLE_SEARCH_URL}${searchTerm}`);
