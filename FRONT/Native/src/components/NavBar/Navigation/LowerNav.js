import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Main from "../../Home/Home";
import ListOfFiltered from "../../ListOfFiltered/ListOfFiltered";
import home from "../Navigation/home"

const Tab = createBottomTabNavigator();

export const LowerNav = () => {
    return(
        <Tab.Navigator>
            <Tab.Screen name = "HomeScreen" component = { Main } />
            <Tab.Screen name = "List" component = { home } />
        </Tab.Navigator>

    );
}