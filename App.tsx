/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/redux/reducers'
import HomeScreen from './src/screens/HomeScreen'

const store = createStore(rootReducer)
function App(): React.JSX.Element {

  return (
    <Provider store={store}>
  <HomeScreen/>
    </Provider>
  );
}

export default App;
