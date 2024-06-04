import { User } from "redux/types";

export const SEARCH_USER = 'SEARCH_USER';

export const searchUser = (username: string, filteredList: User[]) => ({
  type: SEARCH_USER,
  payload: username,
  data: filteredList
});
