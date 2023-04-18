
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


const Notifications = () => {
    const userData = useSelector(state=>state.userInfo)

  return (

    <View style={{ backgroundColor: "blue"}}>
      <Text>SOY EL Notifications chiquito</Text>
      <Text>{userData?.role}</Text>
      <Text>{userData?.email}</Text>
      <Text>{userData?.name}</Text>
      <Text>{userData?.phone}</Text>

    </View>
    

  )
}
export default Notifications