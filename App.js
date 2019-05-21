import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ImagePicker from 'react-native-image-picker';
import { Provider }   from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import Home    from './src/screens/Home';

const Navegador = createStackNavigator({
   Home:{
    screen:Home
  }, 
})

const AppContainer = createAppContainer(Navegador);
const store = createStore(applyMiddleware(ReduxThunk));

export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
      )
  }
}