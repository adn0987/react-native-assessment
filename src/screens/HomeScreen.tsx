import UserList from '../components/UserList';
import React from 'react';
import { SafeAreaView } from 'react-native';
import SearchBar from '../components/SearchBar';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView>
      <SearchBar />
      <UserList />
    </SafeAreaView>
  );
};

export default HomeScreen;
