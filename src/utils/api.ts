import axios from "axios";

export const getData = async (url: string) => {
  try {
    const res = await axios.get(url);
    const result = await res.data;
    return result;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("axios cancel");
    } else {
      console.log(err);
    }
    return undefined;
  }
};

export const getMultipleData = async (requestArray: Promise<any>[]) => {
  try {
    const res = await axios.all(requestArray);
    return res;
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log("axios cancel");
    } else {
      console.log(err);
    }
    return undefined;
  }
};
