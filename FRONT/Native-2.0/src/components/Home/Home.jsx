
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import RestosList from '../Restos/RestosList.jsx'
import Map from '../Map/Map.jsx'
import IonicIcon from 'react-native-vector-icons/Ionicons';

import BottonSheetFilters from "../Filters/BottomSheetFilters"
import ListOfFiltered from '../ListOfFiltered/ListOfFiltered.jsx'
import Login from "../Login/Login"
// import LowerNavbar from "../NavBar/LowerNavBar"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Location from "expo-location"



import AppBarTab from '../NavBar/AppBar(oldRouters).jsx'
import LowerNavBar from "../NavBar/LowerNavBar"

import DetailResto from '../DetailResto/DetailResto.jsx';

import { Redirect, Route, Routes } from 'react-router-native'
// import Filters from '../Filters/Filters.jsx';
import { useSelector, useDispatch, } from 'react-redux';
import { filterCards, getAllRestorants, getUserLocation, orderCards, getUbicationByRestorant } from '../../redux/actions';
import SearchBar from '../NavBar/SearchBar.jsx';
import { searchRestorantByString } from '../../redux/actions';

const Home = () => {
  const [loading, setLoading] = useState(true)
  const restorantes = useSelector(state => state.allRestorants);
  const dispatch = useDispatch();
  const restorantById = useSelector(state => state.restorantById);
  const userInfo = useSelector(state => state.userInfo);
  const [searchText, setSearchText] = useState("");

  async function getLocationPermission(){ // esto se puede aplicar en un useEffect para hcerlo en tiempo real
    let { status } = await Location.requestForegroundPermissionsAsync(); 
    // pide permiso para acceder a la ubicacion del usuario
    if(status !== "granted"){
        alert("Permision denied")
        return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
    }
    dispatch(getUserLocation(current))
    //console.log('CURRENT', current)
  }
  getLocationPermission() 
  

  const handleSearch = (text) => {
    setSearchText(text);
  }

  useEffect(() => {
    if (restorantes?.length === 0) {
      setSearchText("");
      
    }
  }, [restorantes]);

  useEffect(() => {
    if(searchText !== ""){
        dispatch(searchRestorantByString(searchText));
    }
    else{
        dispatch(searchRestorantByString(""));
    }

  }, [searchText]);

  const resto = useSelector(state => state.allRestorants);



  // dispatch(clearStateResatorantById())
  // console.log("HOME USER INFO: ", userInfo?.name);
  // useEffect(() => {
  //   // if(restorantes?.length !== 0) { setLoading(false) }
  // //   // await AsyncStorage.setItem()
  // //   else if(restorantes?.length === 0)dispatch(getAllRestorants());
  // //   // listaRestos = useSelector(state => state.allRestorants);
  // },[restorantes])
  const Tab = createBottomTabNavigator();


  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: "#efe4dc" }}>
      <Text style={styles.language}>Descrubre los mejores restaurants...</Text>
      {/* <View style={styles.searchBar}>
      <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View> */}
      <RestosList />
      <BottonSheetFilters />
    </View>


  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonLocation: {
    position: 'absolute',
    buttom: 40,
    right: 25,
  },
  buttonColor: {
    backgroundColor: '#705E9C',
    width: 70,
    height: 60,
    borderRadius: 10,
    justifyContent: 'center',

  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    top: -15,
    alignSelf: 'center',
  },
  searchBar:{
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
  language: {
    fontSize: 35,
    color: 'black',
    fontFamily: 'Inria-Sans-Bold',
    padding: 4,
    alignSelf: 'flex-start',
    // marginVertical: 4,
    marginLeft: 10,
    borderRadius: 4,
    overflow: 'hidden'
  },
})

export default Home