import {
  CHARACTER_IMAGE_URL,
  PEOPLE_SEARCH_URL,
  PEOPLE_URL,
} from "../constants";
import { getData, getMultipleData } from "../utils/api";
import { formMultipleRequestURL } from "../utils/common";

export const retrieveCharacterList = async () => await getData(PEOPLE_URL);

export const retrieveCharacterImageList = async () =>
  await getData(CHARACTER_IMAGE_URL);

export const retrieveCharacterDetails = async (id: string | undefined) =>
  await getData(`${PEOPLE_URL}/${id}`);

export const retrieveSearchedCharacters = async (searchTerm: string) =>
  await getData(`${PEOPLE_SEARCH_URL}${searchTerm}`);

export const getFilmsAndStarshipData = async (urlArray: string[]) => {
  let data = await getMultipleData(formMultipleRequestURL(urlArray));
  if (data) {
    return data;
  }
};