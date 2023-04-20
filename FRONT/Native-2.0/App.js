import { StyleSheet, View, Button, Text } from 'react-native';
import React, { useRef, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'

import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './src/redux/store'
import { Provider } from 'react-redux'

import { LowerNavbar } from './src/components/NavBar/LowerNavBar';
// import LowerNavBar from "../Native/src/components/NavBar/SearchBar"
import { useFonts } from "expo-font";
import Loading from './src/components/Loading/Loading';

//Fuentes 
const fontConfig = {
  "Inria-Sans-Regular": require("./assets/Inria_Sans/InriaSans-Regular.ttf"),
  "Inria-Sans-Bold": require("./assets/Inria_Sans/InriaSans-Bold.ttf"),
  "Inria-Sans-Italic": require("./assets/Inria_Sans/InriaSans-Italic.ttf"),
  "Inria-Sans-Bold-Italic": require("./assets/Inria_Sans/InriaSans-BoldItalic.ttf"),
  "Inria-Sans-Light": require("./assets/Inria_Sans/InriaSans-Light.ttf"),
  "Inria-Sans-Light-Italic": require("./assets/Inria_Sans/InriaSans-LightItalic.ttf"),
};


export default function App() {

  const [loaded] = useFonts(fontConfig);
  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<Loading text="Cargando datos de la aplicacion..."/>} persistor={persistor}>
        <NavigationContainer>
          <BottomSheetModalProvider>
            <LowerNavbar/>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


