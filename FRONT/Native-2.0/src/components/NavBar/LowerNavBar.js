import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Image, Alert } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { useNavigation } from '@react-navigation/native';


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
import About from '../About/About.jsx';
import Support from '../About/Support.jsx';
import CustomDrawer from './CustomDrawer.jsx';
import WebAdmin from '../About/WebAdmin.jsx';

// import MercadoPago from '../MercadoPago/MercadoPago.js';
// import MercadoPago1 from '../MercadoPago/MercadoPago.js';
// import CheckOut from '../MercaPaga/Checkout.js';

// import SettingsScreen from './screens/SettingsScreen';



// -------------------- HomeScreenStack --------------------
const HomeStackNavigator = createNativeStackNavigator();
function HomeScreenStack(){
  const navigation = useNavigation();

  function LogoTitle() {
    return (
      <View style={{ flexDirection:"row", justifyContent:"center", alignItems:"center", alignSelf:"center" }}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require('../../img/png/eatout-logo.png')}
        />
        <Text style={{ color: "white", fontSize:20}}>EatOut</Text>
      </View>
    );
  }

  return(
    <HomeStackNavigator.Navigator
      initialRouteName='Eat Out'
      screenOptions={{
        headerShown: true,
        screenBackground: 'transparent',
        headerStyle: { backgroundColor: '#FA6B6B', height: 90  },
        headerTintColor: '#fff'

      }}
    >
      <HomeStackNavigator.Screen
        name="Eat Out viejo"
        // component={Home}
          // component={HeaderStackNavigator}

          options={{
            headerShown: false,            
            headerTitle: (props) => <LogoTitle {...props} />,
            // headerRight: () => (
            //   <TouchableOpacity
            //   // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            //   onPress={() => Alert.alert("HOLA QUE TAL")}
            //   >
            //     <IonicIcon
            //             style={{ marginRight: 5 }}
            //             name={'menu'}
            //             size={40}
            //             color={'#efe4dc'}
            //       />
            //   </TouchableOpacity>
            // ),
            
          }}
          
      >
        {() => (
          <Drawer.Navigator
            drawerContent={ props => <CustomDrawer {...props}/>}
            screenOptions={{
              // headerShown: false,
              drawerIcon: null,
              drawerPosition:"rigth",
              screenBackground: 'transparent',
              headerStyle: { backgroundColor: '#FA6B6B', height: 60  },
              headerTintColor: '#fff',
              drawerActiveTintColor: "#512e2e",
              drawerActiveBackgroundColor: "#ff9383",
            }}
          >
            <Drawer.Screen name="Inicio" component={Home} 
              options={{
                
                headerTitle: (props) => <LogoTitle {...props} />,
                // headerShown: false,
                drawerIcon:({color})=>(
                  <IonicIcon
                      style={{ marginRight: 5, marginLeft:20 }}
                      name={'home-outline'}
                      size={25}
                      color={color}
                    />
                ),
                // drawerIcon: null,
              }}
              
            />
            <Drawer.Screen name="Sobre Nosotros" component={About} 
              options={{
                drawerIcon:({color})=>(
                  <IonicIcon
                      style={{ marginRight: 5, marginLeft:20 }}
                      name={'people-outline'}
                      size={25}
                      color={color}
                    />
                ),
                // headerLeft: () => (
                //   <TouchableOpacity
                //     onPress={() => navigation.goBack()}
                //   >
                //     <IonicIcon
                //       style={{ marginRight: 5, marginLeft:20 }}
                //       name={'arrow-back'}
                //       size={25}
                //       color={'#efe4dc'}
                //     />
                //   </TouchableOpacity>
                // ),
              }}
            />
            <Drawer.Screen name="Web Admin" component={WebAdmin} 
              options={{
                drawerIcon:({color})=>(
                  <IonicIcon
                      style={{ marginRight: 5, marginLeft:20 }}
                      name={'earth-outline'}
                      size={25}
                      color={color}
                    />
                ),
                // headerLeft: () => (
                //   <TouchableOpacity
                //     onPress={() => navigation.goBack()}
                //   >
                //     <IonicIcon
                //       style={{ marginRight: 5, marginLeft:20 }}
                //       name={'arrow-back'}
                //       size={25}
                //       color={'#efe4dc'}
                //     />
                //   </TouchableOpacity>
                // ),
              }}
            />
            <Drawer.Screen name="Soporte" component={Support} 
              options={{
                drawerIcon:({color})=>(
                  <IonicIcon
                      style={{ marginRight: 5, marginLeft:20 }}
                      name={'construct-outline'}
                      size={25}
                      color={color}
                    />
                ),
                  // headerLeft: () => (
                  //   <TouchableOpacity
                  //     onPress={() => navigation.goBack()}
                  //   >
                  //     <IonicIcon
                  //       style={{ marginRight: 5, marginLeft:20 }}
                  //       name={'arrow-back'}
                  //       size={25}
                  //       color={'#efe4dc'}
                  //     />
                  //   </TouchableOpacity>
                  // ),
              }}
            />


          </Drawer.Navigator>
        )}
        </HomeStackNavigator.Screen>
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
      <BurgerStackNavigator.Screen
        name="Sobre Nosotros"
        component={About}  
      />

      <BurgerStackNavigator.Screen
        name="Soporte"
        component={Support}   
      />
{/* <HomeStackNavigator.Screen
        name="Favoritos"
        component={FavoritesScreen}   // aca va el componente Reviews
      /> */}
    </HomeStackNavigator.Navigator>
  )

}
// -------------------- HomeScreenStack --------------------


// -------------------- BurgerScreenNavigator --------------------

const BurgerStackNavigator = createNativeStackNavigator();
function BurgerScreenNavigator(){
  return(
    <BurgerStackNavigator.Navigator
      initialRouteName='Eat Out'
      screenOptions={{
        screenBackground: 'transparent',
        headerStyle: { backgroundColor: '#FA6B6B', height: 90  },
        headerTintColor: '#fff',
      }}
      
    >
      
      <BurgerStackNavigator.Screen
        name="Sobre Nosotros"
        component={About}  
      />

      <BurgerStackNavigator.Screen
        name="Soporte"
        component={Support}   
      />

    </BurgerStackNavigator.Navigator>
  )

}
// -------------------- BurgerScreenNavigator --------------------


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

// ----------------- DrawerAboutNavigator -----------------
// const Drawer = createDrawerNavigator();

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

// function AboutScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>About Screen</Text>
//     </View>
//   );
// }

// function DrawerContent({ navigation }) {
//   const goToHome = () => {
//     navigation.navigate('Home');
//     navigation.closeDrawer();
//   };

//   const goToAbout = () => {
//     navigation.navigate('About');
//     navigation.closeDrawer();
//   };

//   return (
//     <View style={{ flex: 1, paddingTop: 50 }}>
//       <Text style={{ margin: 10, fontWeight: 'bold' }}>Menu</Text>
//       <Text style={{ margin: 10 }} onPress={goToHome}>
//         Home
//       </Text>
//       <Text style={{ margin: 10 }} onPress={goToAbout}>
//         About
//       </Text>
//     </View>
//   );
// }

// function DrawerAboutNavigator() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         initialRouteName="Home"
//         drawerContent={(props) => <DrawerContent {...props} />}
//       >
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="About" component={AboutScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// ----------------- DrawerAboutNavigator -----------------

// ----------------- HeaderStackNavigator -----------------

// function LogoTitle() {
//   return (
//     <View style={{ flexDirection:"row", justifyContent:"center", alignItems:"center", alignSelf:"center" }}>
//       <Image
//         style={{ width: 50, height: 50 }}
//         source={require('../../img/png/eatout-logo.png')}
//       />
//       <Text style={{ color: "white", fontSize:20}}>EatOut</Text>
//     </View>
//   );
// }

// const HeaderStack = createNativeStackNavigator();
// function HeaderStackNavigator() {

//   const navigation = useNavigation();

// const openDrawer = () => {
//   navigation.openDrawer();
// };

//   return (
    
//       <HeaderStack.Navigator
//         screenOptions={{
//           // headerShown: false,
//           screenBackground: 'transparent',
//           headerStyle: { backgroundColor: '#FA6B6B', height: 90  },
//           headerTintColor: '#fff'

//         }}
//       >
//         <HeaderStack.Screen
//           name="Home"
//           component={HomeScreenStack}
          
//           options={{
//             headerTitle: (props) => <LogoTitle {...props} />,
//             headerRight: () => (
//               <TouchableOpacity
//               // onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
//               onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
//               >
//                 <IonicIcon
//                         style={{ marginRight: 5 }}
//                         name={'menu'}
//                         size={40}
//                         color={'#efe4dc'}
//                   />
//               </TouchableOpacity>
//             ),
//           }}
          
//         />
//       </HeaderStack.Navigator>
//   );
// }
// ----------------- HeaderStack -----------------





// -------------------- Tab Navigator --------------------
const Drawer = createDrawerNavigator();

const Tab = createBottomTabNavigator();
export const LowerNavbar = () => {
  const userData = useSelector(state=>state?.userInfo)
  const dataNotificationsReversed = userData?.notificacion && [...userData?.notificacion]?.reverse();
  const notificationCounter = dataNotificationsReversed?.length
  const navigation = useNavigation();
  return ( 
  // <Drawer.Navigator>
    
  //   <Drawer.Screen name="TabStack">
  //     {() => (    
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
          headerStyle: { backgroundColor: '#FA6B6B', height: 60  },
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
        >
          
        </Tab.Screen>

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
  //  )}
  //   </Drawer.Screen>
  //   <Drawer.Screen name="Home" component={HomeChiquito} />
  //   <Drawer.Screen name="Settings" component={HomeChiquito} />
  // </Drawer.Navigator>
  );
};
// -------------------- Tab Navigator --------------------








