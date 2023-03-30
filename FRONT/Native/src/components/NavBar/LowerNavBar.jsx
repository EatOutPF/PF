import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; //importamos los iconos de Ionicons

import RestosList from '../Restos/RestosList.jsx'

import ListOfFiltered from '../ListOfFiltered/ListOfFiltered.jsx'

// import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const LowerNavbar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Text>ICON</Text>
          //<Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={RestosList} />
      <Tab.Screen name="Profile" component={ListOfFiltered} />
      {/* <Tab.Screen name="Settings" component={<Text>hola</Text>} /> */}
    </Tab.Navigator>
  );
};

export default LowerNavbar;






