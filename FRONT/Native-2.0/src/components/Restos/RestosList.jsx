import React, { useEffect, useState } from 'react'
import { FlatList, Text, StyleSheet, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import PagerView from 'react-native-pager-view';
import StyledText from "../../styles/StyledText/StyledText"
import theme from '../../styles/theme';
import { useDispatch, useSelector } from 'react-redux'
// import AsyncStorage from "@react-native-async-storage/async-storage"
import { getAllRestorants, clearStateResatorantById, getUserLocation, getUbicationByRestorant } from '../../redux/actions'
import Loading from "../Loading/Loading"
import CarouselAux from './CarouselAux';

import RepositoryItem from './RestosItem.jsx'


const RestosList = () => {
  const dispatch = useDispatch();
  const resto = useSelector(state => state.allRestorants);
  const restorantById = useSelector(state => state.restorantById);
  const restorantByDistance = useSelector(state => state.allRestorantsDistance)
  const userLocation = useSelector(state => state.userLocation);
  const ubicationByRestorant = useSelector(state => state.ubicationByRestorant)
  // const restorantById = useSelector(state => state.restorantById);

  const [loading, setLoading] = useState(true)
  const [restorantes, setRestorantes] = useState([]);

  useEffect(() => {
    setLoading(true)
    dispatch(getAllRestorants());
    if (resto?.length === 0) {
      setLoading(true)
    }
    if (resto?.length !== 0) {
      setRestorantes([...resto])
      setLoading(false)
    }
    if (Object?.keys(restorantById)?.length !== 0) dispatch(clearStateResatorantById())

  }, [])

  useEffect(() => {

    if (resto?.length === 0) {
      setLoading(true)
      dispatch(getAllRestorants());
    }
    if (resto?.length !== 0) {
      setRestorantes([...resto])
      setLoading(false)

    }
    if (Object?.keys(restorantById)?.length !== 0) dispatch(clearStateResatorantById())


  }, [resto])

  useEffect(() => {
    if (resto?.length !== 0) {
      dispatch(getUbicationByRestorant())

    }

  }, [])

  // ----Funcion que calcula distancia en metros----:
  //Latitud y longitud en metros de todos los restorants



  return (
    <ScrollView>

      {loading ? <Loading text="Buscando los Restaurantes cercanos..." /> : <View>
        {/* <Text>Rating</Text>

        <CarouselAux type={"ranking"} title={"fumadores"}></CarouselAux> */}


        {/* <Text>mejores puntuados ⭐️</Text> */}
        <StyledText style={styles.language}> ⭐️Mejores Puntuados⭐️</StyledText>
        <CarouselAux
          data={
            // restorantes
            restorantes?.sort((a, b) => b.ranking - a.ranking)
          }
          type={"extra"}
          title={"fumadores"}>
        </CarouselAux>
        {/* <Text></Text> */}

        {/* <Text>Fumadores 🚬</Text> */}
        <StyledText style={styles.language}> 🗺️ Mas cercanos 🗺️</StyledText>
        <CarouselAux
          data={
            // restorantes
            restorantByDistance
            // restorantes?.sort((a, b) => b.distanceToUser - a.distanceToUser)
          }
          type={"extra"}
          title={"fumadores"}>
        </CarouselAux>
        {/* <Text></Text> */}


       

        {/* <Text>Wi-fi Gratis 📡</Text> */}
        <StyledText style={styles.language}> 💲 Economicos 💲</StyledText>
        <CarouselAux
          data={
            restorantes?.sort((a, b) => a.advance - b.advance)
          }
          type={"room"}
          title={"wi-fi"}>
        </CarouselAux>
        {/* <Text></Text> */}
        {/* 
      <Text>Bares 🍻</Text> */}
        <StyledText style={styles.language}> 🍻 Bares 🍻</StyledText>
        <CarouselAux
          data={
            // restorantes

            restorantes?.filter(item => item?.extras?.includes("bar"))
          }
          type={"room"}
          title={"wi-fi"}>
        </CarouselAux>
        {/* <Text></Text> */}

         {/* <Text>Petfriendly 🐶 </Text> */}
         <StyledText style={styles.language}> 🐶 Petfriendly 🐶</StyledText>
        <CarouselAux
          data={
            // restorantes
            restorantes?.filter(item => item?.extras?.includes("petfriendly"))

          }
          type={"extra"}
          title={"petFrienly"}>
        </CarouselAux>
        {/* <Text></Text> */}

      </View>}
    </ScrollView>
  )
}

const { width } = Dimensions.get('window');
// console.log("width screen", width);
let imageWidth = 0.5 * width;
let screenwidth = "100%"
if (width >= 1000) { imageWidth = width * 0.3; screenwidth = "50%"; }

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 5,
    // flexDirection: "column"
    width: screenwidth,
  },
  language: {
    fontSize: 30,
    color: 'black',
    fontFamily: 'Inria-Sans-Bold',
    padding: 4,
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

export default RestosList