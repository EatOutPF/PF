import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { getHeaderTitle } from '@react-navigation/elements';
import { Ionicons } from '@expo/vector-icons'; //importamos los iconos de Ionicons
import IonicIcon from 'react-native-vector-icons/Ionicons';

import Home from '../Home/Home.jsx';
import DetailResto from '../DetailResto/DetailResto.jsx';
import Login from '../Login/Login.jsx';
import Map from "../Map/Map"
import HomeChiquito from './Navigation/HomeChiquito.jsx';
import RestosList from '../Restos/RestosList.jsx'
import ListOfFiltered from '../ListOfFiltered/ListOfFiltered.jsx'
import Filters from '../Filters/Filters.jsx';
import BottonSheetFilters from '../Filters/BottomSheetFilters.jsx';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';
import ListReviews from '../Reviews/Reviews.jsx';

// import MercadoPago from '../MercadoPago/MercadoPago.js';
// import MercadoPago1 from '../MercadoPago/MercadoPago.js';
// import CheckOut from '../MercaPaga/Checkout.js';

// import SettingsScreen from './screens/SettingsScreen';



// -------------------- HomeScreenStack --------------------
const HomeStackNavigator = createNativeStackNavigator();
function HomeScreenStack(){
  return(
    <HomeStackNavigator.Navigator
      initialRouteName='Eat Out'
      screenOptions={{
        screenBackground: 'transparent',
        headerStyle: { backgroundColor: '#FA6B6B', height: 90  },
        headerTintColor: '#fff',
      }}
    >
      <HomeStackNavigator.Screen
        name="Eat Out"
        component={Home}
      />
      <HomeStackNavigator.Screen
        name="Detalle Restaurant"
        component={DetailResto}
      />
      <HomeStackNavigator.Screen
        name="Checkout"
        component={CheckoutPayment}
      />
      <HomeStackNavigator.Screen
        name="Filtrados"
        component={ListOfFiltered}
      />
      <HomeStackNavigator.Screen
        name="Mapa"
        component={Map}
      />
      <HomeStackNavigator.Screen
        name="Reseñas"
        component={HomeChiquito}   // aca va el componente Reviews
      />

    </HomeStackNavigator.Navigator>
  )

}
// -------------------- HomeScreenStack --------------------


// -------------------- Tab Navigator --------------------
const Tab = createBottomTabNavigator();
export const LowerNavbar = () => {

  return (
    <Tab.Navigator    
    //  -------------------- CSS Tab Navigator --------------------
      tabBarOptions={{
        style: {
          backgroundColor: 'red',
          borderTopWidth: 0,
        },
        activeTintColor: '#512e2e', 
        inactiveTintColor: '#efe4dc', 
        showIcon: false,
        showLabel: false, 
        pressColor: 'green', 
        tabStyle: {width: 82}, 
        allowFontScaling: true, 
      }}
      screenOptions={({ route }) => ({
        // style: {
        //   backgroundColor: 'red',
        //   borderTopWidth: 0,
        // },
        // activeTintColor: '#512e2e', 
        // inactiveTintColor: '#efe4dc', 
        // showIcon: false,
        // showLabel: false, 
        // pressColor: 'green', 
        // tabStyle: {width: 82}, 
        //tabBarActiveTintColor": "#512e2e",
        tabBarInactiveTintColor: "#efe4dc",
        tabBarAllowFontScaling: true,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          "width": 82
        },        
        tabBarStyle: [{ 
            backgroundColor: "#FA6B6B",
            borderTopLeftRadius: 35,
            display: "flex"
            
          },    
          null
        ],
        screenBackground: 'transparent',
        headerShown: false,
        headerStyle: { backgroundColor: '#FA6B6B', height: 90  },
        headerTintColor: '#fff',
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = focused ? 'home' : 'home-outline';
            } 
            else if (route.name === 'Favoritos') {
              iconName = focused ? 'heart' : "heart-outline";
            }
            else if (route.name === 'Calendario') {
              iconName = focused ? 'calendar' : "calendar-outline";
            }
            else if (route.name === 'Notificaciones') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }
            else if (route.name === 'Perfil') {
              iconName = focused ? 'person' : 'person-outline';
            } 

            return( 
              <Ionicons name={iconName} size={size} color={color} />
            )
          },
        }
        )
        
      }
    //  -------------------- CSS Tab Navigator --------------------

    //  -------------------- BODY Tab Navigator --------------------      
    >
      <Tab.Screen 
          name="Inicio" 
          component={HomeScreenStack} 
          options={{
            //tabBarBadge: 3,
          }}
      />
      <Tab.Screen 
          name="Favoritos" 
          component={HomeChiquito} 
      />
      <Tab.Screen 
          name="Calendario" 
          component={HomeChiquito} 
      />
      <Tab.Screen 
          name="Notificaciones" 
          component={HomeChiquito} 
          options={{
            tabBarBadge: 29,
          }}
      />
      <Tab.Screen 
          name="Perfil" 
          component={Login} 
      />

    </Tab.Navigator>
    //  -------------------- BODY Tab Navigator --------------------      

  );
};
// -------------------- Tab Navigator --------------------








