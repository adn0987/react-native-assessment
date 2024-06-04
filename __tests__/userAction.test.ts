import { searchUser } from '../src/redux/actions/userAction';
import { SEARCH_USER } from '../src/redux/actions/userAction';
import { User } from '../src/redux/types';

describe('searchUser action creator', () => {
  it('creates an action to search user', () => {
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
    const expectedAction = {
      type: SEARCH_USER,
      payload: username,
      data: filteredList
    };

    expect(searchUser(username, filteredList)).toEqual(expectedAction);
  });
});
