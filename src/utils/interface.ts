import { FlexProps, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  route: string;
}

export interface MobileProps extends FlexProps {
  onOpen: () => void;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  path: string;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}

export interface CharacterWithImage {
  id: string;
  name: string;
  homeworld: string;
  wiki: string;
  image: string;
  died: string;
  diedLocation: string;
  species: string;
  cybernetics: string;
  affiliations: string[];
  masters: string[];
  apprentices: string[];
  isFavorite?: boolean;
  dateDestroyed?: string;
  destroyedLocation?: string;
}

export interface StarWarCharacters {
  birth_year: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  name: string;
  skin_color: string;
  films: string[];
  starships: string[];
}
