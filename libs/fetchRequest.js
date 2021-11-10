import Store from "store";

export const requester = async (url, data) => {
  return fetch(url, data);
};
