import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, View, Button } from 'react-native';
import { NativeRouter, } from 'react-router-native'
import 'react-native-gesture-handler';
import { Provider } from 'react-redux'
import { StatusBar } from 'expo-status-bar';
import { store } from './src/redux/store'
import Main from './src/components/Home/Home.jsx'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import Filters from './src/components/Filters/Filters';
import { useFonts } from "expo-font";

const fontConfig = {
  "Inria-Sans-Regular": require("./assets/Inria_Sans/InriaSans-Regular.ttf"),
  "Inria-Sans-Bold": require("./assets/Inria_Sans/InriaSans-Bold.ttf"),
  "Inria-Sans-Italic": require("./assets/Inria_Sans/InriaSans-Italic.ttf"),
  "Inria-Sans-Bold-Italic": require("./assets/Inria_Sans/InriaSans-BoldItalic.ttf"),
  "Inria-Sans-Light": require("./assets/Inria_Sans/InriaSans-Light.ttf"),
  "Inria-Sans-Light-Italic": require("./assets/Inria_Sans/InriaSans-LightItalic.ttf"),
};

const App = () => {
  const bottomSheetModalRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loaded] = useFonts(fontConfig);
  if (!loaded) {
    return null;
  }
  // const snapPoints = ['30%', '50%', '70%']
  const snapPoints = ['70%']

  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
    console.log(bottomSheetModalRef.current)
  }

  const handleBottonSheet = () => {
    bottomSheetModalRef.current.forceClose();
  };

  return (
    <Provider store={store}>
      <BottomSheetModalProvider
      >
        <View style={styles.container}>
          <StatusBar style="auto" />
          <NativeRouter>
            <Main />
            <Button title='Filtros' onPress={handlePresentModal} />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              backgroundStyle={{ borderRadius: 50 }}
              enableDismissOnClose={true}
              onClose={() => setIsOpen(false)}
            >
              <View style={styles.contentContainer}>
                <Filters
                  array={isOpen}
                  handleBottonSheet={handleBottonSheet}
                />
              </View>
            </BottomSheetModal>
          </NativeRouter>
        </View>
      </BottomSheetModalProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: '900',
    letterSpacing: 1,
    fontSize: 20,
    right: 100
  }
});


export default App;