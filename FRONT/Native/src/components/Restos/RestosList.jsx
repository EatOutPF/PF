import React, { useEffect} from 'react'
import { FlatList, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import PagerView from 'react-native-pager-view';
import { useDispatch, useSelector } from 'react-redux'
// import AsyncStorage from "@react-native-async-storage/async-storage"

import { getAllRestorants } from '../../redux/actions'

import CarouselAux from './CarouselAux';
import restorantsJson from '../../../data/restaurants'
import RepositoryItem from './RestosItem.jsx'



const RepositoryList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // await AsyncStorage.setItem()
    dispatch(getAllRestorants());
    // listaRestos = useSelector(state => state.allRestorants);

  },[])
  

  return (
    <View>
      <Text>Smoke</Text>
        <CarouselAux type={"extra"} title={"smoke"}></CarouselAux>
      <Text>Petfriendly</Text>
        <CarouselAux type={"extra"} title={"petfriendly"}></CarouselAux>
      <Text>Terrace</Text>
        <CarouselAux type={"room"} title={"petfriendly"}></CarouselAux>


    </View>
      // <FlatList 
      //   data={restorantsJson} // de donde saca los datos para hacer la lista
      //   ItemSeparatorComponent={() => <Text> </Text>} // separa cada card con un espacio "Text"
      //   renderItem={({ item: repo }) => (
      //     <RepositoryItem {...repo} />
      //   )}
      // />

  )
}




export default RepositoryList