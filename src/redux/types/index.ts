import { SEARCH_USER } from "redux/actions/userAction";

  export interface User {
    uid: string;
    bananas: number;
    lastDayPlayed: string;
    longestStreak: number;
    name: string;
    rank?: number;
    stars: number;
    subscribed: boolean;
    originalIndex?: number;
  }

  export function createUser(user: Partial<User>, index: number): User {
    return {
        uid: user.uid || '',
        bananas: user.bananas || 0,
        lastDayPlayed: user.lastDayPlayed || '',
        longestStreak: user.longestStreak || 0,
        name: user.name || '',
        rank: user.rank || 0,
        stars: user.stars || 0,
        subscribed: user.subscribed || false,
        originalIndex: index + 1  || 0,
    };
}
  
  export interface UserState {
    list: User[];
    searchedUser: string;
    filteredList: User[];
  }
  
  interface SearchUserAction {
    type: typeof SEARCH_USER;
    payload: string;
    data: User[];
  }
  
  export type UserAction = SearchUserAction;
  