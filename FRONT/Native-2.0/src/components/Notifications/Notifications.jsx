
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CapitalizeString from '../CapitalizeString/CapitalizeString'
import RenderNotification from './RenderNotifications';


const Notifications = () => {
    const userData = useSelector(state=>state.userInfo)
    const dataNotificationsReversed = [...userData?.notificacion].reverse();
    const renderItem = ({ item }) => (
      <RenderNotification item={item} />
    );
    
  return (

    <View style={{ backgroundColor: "#efe4dc"}}>
      <Text style={styles.notificationSubtitle}> 
        {CapitalizeString( userData?.name)} estas son tus notificaciones:
      </Text>

      {/* {userData?.notificacion?.map((notification) => (
        <Text key={notification.id}>{notification.message}</Text>
      ))} */}
      <FlatList
        style={{marginBottom: 28}}
        data={dataNotificationsReversed}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />


    </View>
    

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 8,
    color: '#fff',
  },
  notificationContainer: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    marginBottom: 45,
    borderRadius: 8,
    elevation: 4,
    alignItems: "center"
  },
  notificationText: {
    fontSize: 16,
    color: '#000',
  },
  notificationSubtitle: {
    fontSize: 20,
    color: '#000',
    marginLeft: 5,
  },
});

export default Notifications