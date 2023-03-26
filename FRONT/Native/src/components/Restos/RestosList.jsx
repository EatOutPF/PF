import React, { useEffect, useState} from 'react'
import { FlatList, Text, StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import PagerView from 'react-native-pager-view';
import StyledText from "../../styles/StyledText/StyledText"
import theme  from '../../styles/theme';
import { useDispatch, useSelector } from 'react-redux'
// import AsyncStorage from "@react-native-async-storage/async-storage"

import { getAllRestorants } from '../../redux/actions'
import Loading from "../Loading/Loading"
import CarouselAux from './CarouselAux';

import RepositoryItem from './RestosItem.jsx'


const RepositoryList = () => {
  const [loading, setLoading] = useState(true)

  const restorantes = useSelector(state => state.allRestorants);
  const dispatch = useDispatch();

  useEffect(() => {
    if(restorantes?.length !== 0) { setLoading(false) }
    // await AsyncStorage.setItem()
    else if(restorantes?.length === 0)dispatch(getAllRestorants());
    // listaRestos = useSelector(state => state.allRestorants);

  },[restorantes])
  

  return (
    <ScrollView>
    {loading ? <Loading/> : <View>
      {/* <Text>Rating</Text>
        <CarouselAux type={"ranking"} title={"fumadores"}></CarouselAux> */}

      {/* <Text>Los mejorcitos ⭐️</Text> */}
      <StyledText style={styles.language}>Los mejorcitos ⭐️</StyledText>
        <CarouselAux 
            data={restorantes.sort((a, b) => b.ranking - a.ranking)} 
            type={"extra"} 
            title={"fumadores"}>
        </CarouselAux>

      {/* <Text>Fumadores 🚬</Text> */}
      <StyledText style={styles.language}>Fumadores 🚬</StyledText>
        <CarouselAux 
            data={restorantes.filter( item => item.extras.includes("fumadores"))} 
            type={"extra"} 
            title={"fumadores"}>
        </CarouselAux>
      <Text></Text>


      {/* <Text>Petfriendly 🐶 </Text> */}
      <StyledText style={styles.language}>Petfriendly 🐶</StyledText>
        <CarouselAux 
            data={restorantes.filter( item => item.extras.includes("petfriendly"))} 
            type={"extra"} 
            title={"petFrienly"}> 
        </CarouselAux>
      <Text></Text>
      

      {/* <Text>Wi-fi Gratis 📡</Text> */}
      <StyledText style={styles.language}>Wi-fi Gratis 📡</StyledText>
        <CarouselAux 
            data={restorantes.filter( item => item.extras.includes("wi-fi"))} 
            type={"room"} 
            title={"wi-fi"}>
        </CarouselAux>
      <Text></Text>
{/* 
      <Text>Bares 🍻</Text> */}
      <StyledText style={styles.language}>Bares 🍻</StyledText>
        <CarouselAux 
            data={restorantes.filter( item => item.extras.includes("bar"))} 
            type={"room"} 
            title={"wi-fi"}>
        </CarouselAux>
      <Text></Text>


    </View>}
    </ScrollView>
      // <FlatList 
      //   data={restorantsJson} // de donde saca los datos para hacer la lista
      //   ItemSeparatorComponent={() => <Text> </Text>} // separa cada card con un espacio "Text"
      //   renderItem={({ item: repo }) => (
      //     <RepositoryItem {...repo} />
      //   )}
      // />

  )
}

const { width } = Dimensions.get('window');
console.log("width screen", width);
let imageWidth = 0.5 * width;
let screenwidth = "100%"
if (width >= 1000) {imageWidth = width * 0.3; screenwidth = "50%";}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 5,
    // flexDirection: "column"
    width: screenwidth,
  },
  language: {
    fontSize: 16,
    padding: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    marginVertical: 4,
    marginLeft: 10,
    borderRadius: 4,
    overflow: 'hidden'
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 4
  }
})

export default RepositoryList