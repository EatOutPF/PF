import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CapitalizeString from '../CapitalizeString/CapitalizeString'

const RenderFavs = ({ item }) => {
  
  
    const styles = StyleSheet.create({
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginVertical: 16,
          marginHorizontal: 8,
          color: '#fff',
        },
        notificationContainer: {
          flexDirection: 'row',
          backgroundColor: '#ff9383' ,
          padding: 16,
          marginVertical: 3,
          marginHorizontal: 16,
          borderRadius: 8,
          elevation: 4,
          alignItems: "center",
          justifyContent: "flex-start"
        },
        notificationText: {
          fontSize: 16,
          paddingRight: 30,
          color: '#000',
        },
        notificationSubtitle: {
          fontSize: 20,
          color: '#000',
          marginLeft: 5,
        },
      });

    function handleDeleteNotification(){
        Alert.alert("aca se borra la noti")
    }
    
    return (
      <TouchableOpacity
        style={styles.notificationContainer}
        //onPress={}
      >
      <View style={{flexDirection:"row"}}>

        <Text style={styles.notificationSubtitle}>{item?.restaurant[0]?.name}</Text>
        <Text style ={styles.notificationText}>| {item?.restaurant[0]?.menu} | {item?.restaurant[0]?.diet} | {item?.restaurant[0]?.atmosphere}</Text>
        </View>

      </TouchableOpacity>
    );
  };

 
export default RenderFavs