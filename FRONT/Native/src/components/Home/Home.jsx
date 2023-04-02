
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import RestosList from '../Restos/RestosList.jsx'
import Map from '../Map/Map.jsx'
import IonicIcon from 'react-native-vector-icons/Ionicons';

import BottonSheetFilters from "../Filters/BottomSheetFilters"
import ListOfFiltered from '../ListOfFiltered/ListOfFiltered.jsx'
import Login from "../Login/Login"
// import LowerNavbar from "../NavBar/LowerNavBar"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import AppBar from '../NavBar/AppBar.jsx'
import LowerNavBar from "../NavBar/LowerNavBar"

import DetailResto from '../DetailResto/DetailResto.jsx';

import { Redirect, Route, Routes } from 'react-router-native'
// import Filters from '../Filters/Filters.jsx';
import { useSelector, useDispatch,  } from 'react-redux';
import { filterCards, getAllRestorants, orderCards } from '../../redux/actions';


const Home = () => {
  const [loading, setLoading] = useState(true)
  const restorantes = useSelector(state => state.allRestorants);
  const dispatch = useDispatch();
  const restorantById = useSelector(state => state.restorantById);
  // dispatch(clearStateResatorantById())

  // useEffect(() => {
  //   // if(restorantes?.length !== 0) { setLoading(false) }
  // //   // await AsyncStorage.setItem()
  // //   else if(restorantes?.length === 0)dispatch(getAllRestorants());
  // //   // listaRestos = useSelector(state => state.allRestorants);
  // },[restorantes])
  const Tab = createBottomTabNavigator();


  return (
    <View style={{ flex: 1 , width: '100%', backgroundColor: "#efe4dc"}}>

      <RestosList />   
      <BottonSheetFilters/>
    </View>
    

  )
}

{/*Flor*/ }

// export function FilterButton() {


// return (
//     <View styles={styles.container}>
//       <TouchableOpacity style={styles.buttonLocation} onPress={() => setIsVisible(true)}
//         buttonStyle={styles.button}>
//         <View style={styles.buttonColor}>
//           <Text style={styles.buttonText}>Filtros</Text>
//         </View>
//       </TouchableOpacity>
//       <IonicIcon
//         name="filter"
//         size={22}
//       />
//     </View>
//   ) 
// }



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
})

export default Home