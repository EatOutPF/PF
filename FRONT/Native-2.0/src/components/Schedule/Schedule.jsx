
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'


const Schedule = () => {
    const userData = useSelector(state=>state.userInfo)
  return (

    <View style={{ backgroundColor: "yellow"}}>
      <Text>SOY EL schedule </Text>
      <Text>{userData?.email}</Text>
      <Text>{userData?.name}</Text>
      <Text>{userData?.phone}</Text>

    </View>
    

  )
}
export default Schedule