import { StyleSheet, View, Button, Text } from 'react-native';
import React, { useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'
import { Provider } from 'react-redux'

import { LowerNavbar } from './src/components/NavBar/LowerNavBar';
// import LowerNavBar from "../Native/src/components/NavBar/SearchBar"

export default function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
        <NavigationContainer>
          <BottomSheetModalProvider>
            <LowerNavbar/>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


