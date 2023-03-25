import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NativeRouter, } from 'react-router-native'

import { store } from './src/redux/store'
import { Provider } from 'react-redux'

import Main, { FilterButton } from './src/components/Home/Home.jsx'


{/* Importaciones FLOR*/ }
import 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import Filters from './src/components/Filters/Filters';





export default function App() {


  {/*Flor----*/ }

    const bottomSheetModalRef = useRef(null)
    const snapPoints = ['60%']
    const [isOpen, setIsOpen] = useState(false)
     function handlePresentModal(){
        bottomSheetModalRef.current?.present();
    }


    const handleBottonSheet = (newValue) => {
      console.log(newValue)
      setIsOpen(newValue);
      console.log(isOpen)
    };


  {/*-------Flor*/ }


  return (
    <BottomSheetModalProvider>
    <Provider store={store}>
      <View style={styles.container}>
        {/* <Text>Esta al es de prueba en React Native 12.</Text> */}
        <StatusBar style="auto" />
        <NativeRouter>
          <Main />
          <Button title='Filtros' onPress={handlePresentModal}/>
          <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{borderRadius: 50}}
          enableDismissOnClose={true}
          onClose={()=> setIsOpen(false)}
          >
          <View style={styles.contentContainer}>
            
            <Filters 
            array = {isOpen}
            handleBottonSheet={handleBottonSheet}/>
            </View>  
          </BottomSheetModal>

        </NativeRouter>
      </View>
    </Provider>
    </BottomSheetModalProvider>

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


