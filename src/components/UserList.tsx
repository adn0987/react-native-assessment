import React, {useState} from 'react';
import { FlatList, Text, Button } from 'react-native';
import styled from 'styled-components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { User } from '../redux/types';

const ListContainer = styled.View`
  padding: 20px;
`;

const ListItem = styled.View<{ highlight: boolean }>`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  background-color: ${({ highlight }) => (highlight ? '#c1f0c1' : '#fff')};
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

const UserList = () => {
  const { list, searchedUser, filteredList } = useSelector((state: RootState) => state.users);
  const [sortBy, setSortBy] = useState<'name' | 'bananas'>('bananas');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc'); 
  const [showLowestRanked, setShowLowestRanked] = useState(false);

  let sortedList : User[] = filteredList
  .map((user, index) => ({ ...user, originalIndex: index }))
  .sort((a, b) => {
    if (sortBy === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortBy === 'bananas') {
      if (a.bananas === b.bananas) {
        if (!showLowestRanked) {
          return a.name.localeCompare(b.name);
        }
        return sortOrder === 'asc'
          ? a.originalIndex - b.originalIndex
          : b.originalIndex - a.originalIndex;
      }
      return sortOrder === 'asc' ? a.bananas - b.bananas : b.bananas - a.bananas;
    }
    return 0;
  });
  

  return (
    <ListContainer>
        <>
          <Button
            title={`Sort by ${sortBy === 'name' ? 'bananas' : 'name'}`}
            onPress={() => setSortBy(sortBy === 'name' ? 'bananas' : 'name')}
          />
          <Button
            title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          />
          <Button
            title={`Show Lowest Ranked`}
            onPress={() => {
              setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}}
              
          />
        </>

              <FlatList
          data={sortedList}
          keyExtractor={(item) => item.uid}
          renderItem={({ item, index }) => (
            <ListItem highlight={item.name.toLowerCase() === searchedUser.toLowerCase()}>
              <Text>{`${index + 1}. ${item.name}`}</Text>
              <Text>{`Rank: ${item.rank != 0 ? item.rank : item.originalIndex! + 1}`}</Text>
              <Text>{`Bananas: ${item.bananas}`}</Text>
            </ListItem>
          )}
        />
    
    </ListContainer>
  );
  
};

export default UserList;
