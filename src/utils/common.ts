import axios from "axios";

export const formMultipleRequestURL = (URLArray: string[]) => {
  let groupRequest: Promise<any>[] = [];
  URLArray.forEach((url: string) => {
    groupRequest.push(axios.get(url));
  });
  return groupRequest;
};
