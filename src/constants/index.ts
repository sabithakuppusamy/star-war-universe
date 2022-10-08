//API URLs
export const BASE_URL = "https://swapi.dev/api";
export const PEOPLE_URL = `${BASE_URL}/people`;
export const PEOPLE_SEARCH_URL = `${PEOPLE_URL}/?search=`;
export const CHARACTER_IMAGE_URL =
  "https://akabab.github.io/starwars-api/api/all.json";

//Route URLs

//constants
export const CHANGE_LIGHT_THEME = "Change to light theme";
export const CHANGE_DARK_THEME = "Change to dark theme";
export const PLACEHOLDER_IMAGE =
  "https://vignette.wikia.nocookie.net/starwars/images/6/68/RattsHS.jpeg";
export const LOAD_MORE = "Load more";
export const SCROLL_TOP = "Scroll to Top";
export const FILMS = "films";
export const STAR_SHIPS = "starships";
export const PLACEHOLDER_SEARCH_TEXT = "Search character name";
export const FAV_KEY = "Favorites";
export const ADD_TO_FAVORITES = "Add to Favorites";
export const REMOVE_FROM_FAVORITES = "Remove from Favorites";
export const NO_FAV_TEXT =
  "Once you've added something to Favorites, it will appear here.";

//Enum
export enum ETheme {
  DARK = "dark",
  LIGHT = "light",
  SYSTEM = "system",
}

export enum ESidebarMenu {
  CHARACTERS = "Characters",
  FAVORITES = "Favorites",
}

export enum ESidebarRoute {
  CHARACTERS = "/characters",
  FAVORITES = "/characters?filter=favorites",
}
