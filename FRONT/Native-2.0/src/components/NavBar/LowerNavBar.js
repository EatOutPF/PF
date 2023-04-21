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
import Schedule from '../Schedule/Schedule.jsx';
import RestosList from '../Restos/RestosList.jsx'
import ListOfFiltered from '../ListOfFiltered/ListOfFiltered.jsx'
import Filters from '../Filters/Filters.jsx';
import BottonSheetFilters from '../Filters/BottomSheetFilters.jsx';
import CheckoutPayment from '../CheckoutPayment/CheckoutPayment';
import CheckoutState from '../CheckoutPayment/CheckoutState';
import MyComponent from '../CheckoutPayment/prueba1.jsx';

import ProfileFirebase from '../Profile/ProfileFirebase.jsx';
import Notifications from '../Notifications/Notifications.jsx';
import { useSelector } from 'react-redux';
import MapToResto from '../Map/MapToResto.jsx';
import Favorites from '../Favorites/Favorites.jsx';
import ListReviews from '../Reviews/ListReviews.jsx'
import AddReviews from '../Reviews/AddReviews.jsx'

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
        headerTintColor: '#fff'
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
        name="Estado de la Reserva"
        component={CheckoutState}
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
        name="Resenias del restaurant"
        component={ListReviews} 
      
      />
        <HomeStackNavigator.Screen
        name="Comentar resenia"
        component={AddReviews} 
      
      />
{/* <HomeStackNavigator.Screen
        name="Favoritos"
        component={FavoritesScreen}   // aca va el componente Reviews
      /> */}
    </HomeStackNavigator.Navigator>
  )

}
// -------------------- HomeScreenStack --------------------

// ----------------- NotificationsScreenStack -----------------
const NotificationsStackNavigator = createNativeStackNavigator();
function NotificationsScreenStack(){
  return(
    <NotificationsStackNavigator.Navigator
      initialRouteName='Eat Out'
      screenOptions={{
        screenBackground: 'transparent',
        headerStyle: { backgroundColor: '#FA6B6B', height: 90  },
        headerTintColor: '#fff',
      }}
    >
      
      <NotificationsStackNavigator.Screen
        name="Notificaciones"
        component={Notifications}   // aca va el componente Reviews
      />

    </NotificationsStackNavigator.Navigator>
  )

}
// ----------------- NotificationsScreenStack -----------------

// ----------------- ScheduleStackNavigator -----------------
const ScheduleStackNavigator = createNativeStackNavigator();
function ScheduleScreenNavigator(){
  return(
    <ScheduleStackNavigator.Navigator
      initialRouteName='Eat Out'
      screenOptions={{
        screenBackground: 'transparent',
        headerStyle: { backgroundColor: '#FA6B6B', height: 90  },
        headerTintColor: '#fff',
      }}
    >
      
      <ScheduleStackNavigator.Screen
        name="📅 Calendario"
        component={Schedule}   // aca va el componente Reviews
      />

      <ScheduleStackNavigator.Screen
        name="🗺️ ¿ Comó llegar ?"
        component={MapToResto}   
      />

    </ScheduleStackNavigator.Navigator>
  )

}
// ----------------- ScheduleStackNavigator -----------------

// ----------------- FavoriteStackNavigator -----------------
const FavoriteStackNavigator = createNativeStackNavigator();
function FavoriteScreenNavigator(){
  return(
    <FavoriteStackNavigator.Navigator
      initialRouteName='Eat Out'
      screenOptions={{
        screenBackground: 'transparent',
        headerStyle: { backgroundColor: '#FA6B6B', height: 90  },
        headerTintColor: '#fff',
      }}
    >
      
      <FavoriteStackNavigator.Screen
        name="Favoritos"
        component={Favorites}   // aca va el componente Reviews
      />


    </FavoriteStackNavigator.Navigator>
  )

}
// ----------------- FavoriteStackNavigator -----------------


// -------------------- Tab Navigator --------------------
const Tab = createBottomTabNavigator();
export const LowerNavbar = () => {
  const userData = useSelector(state=>state?.userInfo)
  const notificationCounter= useSelector(state => state?.notificationCounter)
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
            // borderTopLeftRadius: 35,
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
          component={FavoriteScreenNavigator} 
      />
      <Tab.Screen 
          name="Calendario" 
          component={ScheduleScreenNavigator} 
      />
      <Tab.Screen 
          name="Notificaciones" 
          component={NotificationsScreenStack} 
          options={{
            tabBarBadge: notificationCounter,
          }}
      />
      <Tab.Screen 
          name="Perfil" 
          component={userData?.login ? ProfileFirebase : Login} 
      />

    </Tab.Navigator>
    //  -------------------- BODY Tab Navigator --------------------      

  );
};
// -------------------- Tab Navigator --------------------








