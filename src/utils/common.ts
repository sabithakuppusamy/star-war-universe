import axios from "axios";

export const formMultipleRequestURL = (URLArray: string[]) => {
  let groupRequest: Promise<any>[] = [];
  URLArray.forEach((url: string) => {
    groupRequest.push(axios.get(url));
  });
  return groupRequest;
};

export const getLocalStorageItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key: string, value: string): void => {
  localStorage.removeItem(key);
  localStorage.setItem(key, value);
};
