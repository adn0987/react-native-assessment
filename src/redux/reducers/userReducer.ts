import { SEARCH_USER } from '../actions/userAction';
import { UserState, UserAction, User, createUser } from '../types';
import data from '../../data/leaderboard.json';


const transformData = (data: Record<string, User>): User[] => {
  return Object.keys(data).map((key, index) => createUser(data[key], index));
};


const initialState: UserState = {
  list: transformData(data),
  searchedUser: '',
  filteredList: [],
};

const UserReducer = (state = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case SEARCH_USER:
      return { ...state, searchedUser: action.payload, filteredList: action.data };
    default:
      return state;
  }
};

export default UserReducer;
