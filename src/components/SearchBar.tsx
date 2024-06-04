import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../redux/actions/userAction';
import { RootState } from 'redux/reducers';
import { Alert } from 'react-native';
import Fuse, { FuseResult } from 'fuse.js';
import { User } from 'redux/types';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 10px;
  margin-right: 10px;
  flex: 1;
`;

const SearchRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ButtonContainer = styled.View`
  flex-shrink: 0;
`;

const Button = styled.Button``;

const SearchBar: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const dispatch = useDispatch();
  const list = useSelector((state: RootState) => state.users.list);
  const [firstLoad, setFirstLoad] = useState<Boolean>(false);

  const fuse = new Fuse(list, {
    keys: ['name'],
    threshold: 0.3, // Adjust the threshold to fine-tune the fuzzy search
    ignoreLocation: true,
    minMatchCharLength: 2,
  });

  useEffect(() => {
    if (firstLoad) {
      if (username.length === 0) {
        setFirstLoad(false)
      } else {
        console.log("already loaded");
        return;
      }
    }
    dispatch(searchUser(username, list))
    setFirstLoad(true);
  })

  const handleSearch = () => {

    const results : FuseResult<User>[] = fuse.search(username);

    console.log(results);
    

    if (results.length === 0) {
      Alert.alert('Error', 'This user name does not exist! Please specify an existing user name!');
      return;
    }
    
    

    const sortedUsers = list.sort((a, b) => b.bananas - a.bananas);

    const searchedUserIndex = sortedUsers.findIndex(user => user.name.toLowerCase() === username.toLowerCase());
    var top10Users ;
    if (searchedUserIndex !== -1 && searchedUserIndex >= 10) {
      console.log("enter 0");
      
      const item = sortedUsers[searchedUserIndex];

      sortedUsers.splice(9, 1)
      item.rank = searchedUserIndex
      sortedUsers[9] = item
      top10Users = sortedUsers.slice(0, 10);
    } else if (searchedUserIndex !== -1 && searchedUserIndex < 10) {
      console.log("enter 1");
      top10Users = sortedUsers.slice(0, 10);
    } else {
      console.log("enter 2");
      var users: User[] = [];
    results.forEach((item) => {
      users.push(item.item);
    });
    const sortedUsers = users.sort((a, b) => b.bananas - a.bananas);

      top10Users = sortedUsers;
    }


    dispatch(searchUser(username, top10Users))
  };

  return (
    <Container>
      <SearchRow>
      <Input
        placeholder="User name.."
        value={username}
        onChangeText={setUsername}
      />
      <ButtonContainer>
      <Button title="Search" onPress={handleSearch} />
      </ButtonContainer>
      </SearchRow>
    </Container>
  );
};

export default SearchBar;
