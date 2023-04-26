
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'

const CustomDrawer = (props) => {
  return (
    <View style={{flex: 1, backgroundColor:"#efe4dc", }}>
    <DrawerContentScrollView {...props} contentContainerStyle={{backgroundColor:"#efe4dc"}}>
        <DrawerItemList {...props}
            
        />
    </DrawerContentScrollView>
    <View style={{alignItems:"center"}}>
        <Text>EatOut v2.1.3(101)</Text>
        <Text></Text>
    </View>
    </View>

  )
}
export default CustomDrawer