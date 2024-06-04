import UserReducer from '../src/redux/reducers/userReducer';
import { SEARCH_USER } from '../src/redux/actions/userAction';
import { User } from '../src/redux/types';

describe('UserReducer', () => {


  it('handles SEARCH_USER action', () => {
    const username = 'Rica Ella Francisco';
    const filteredList: User[] = [
      {
        bananas: 200,
        lastDayPlayed: '2018-11-22',
        longestStreak: 1,
        name: 'Rica Ella Francisco',
        stars: 6,
        subscribed: false,
        uid: '00D1LA8puAa1GINkVpfgC1TmO0m1'
      }
    ];

    const action = {
      type: SEARCH_USER,
      payload: username,
      data: filteredList
    };

    const newState = UserReducer({}, action);

    expect(newState.searchedUser).toEqual(username);
    expect(newState.filteredList).toEqual(filteredList);
  });
});
