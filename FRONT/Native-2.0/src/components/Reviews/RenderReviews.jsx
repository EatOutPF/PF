import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CapitalizeString from '../CapitalizeString/CapitalizeString'

const RenderReviews = ({ item }) => {
    const [isDone, setIsDone] = useState(false);
  
    const toggleIsDone = () => {
      setIsDone(!isDone);
    };
  
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
          backgroundColor: '#efe4dc' ,
          padding: 16,
          marginVertical: 3,
          marginHorizontal: 16,
          borderRadius: 8,
          elevation: 4,
          alignItems: "center",
          justifyContent: "flex-start"
        },
        notificationTitle: {
          fontSize: 20,
          fontWeight: "bold",
          // textDecorationStyle: "solid",
          color:'#512e2e' ,
          // backgroundColor: "#ff5b4f"
          // marginLeft: 5,
        },
        notificationSubtitle: {
          fontSize: 18,
          color: '#512e2e',
          marginLeft: 20,
          marginRight: 10
        },
      });

    function handleDeleteNotification(){
        Alert.alert("aca se borra la noti")
    }
    
    return (
      <TouchableOpacity
        style={styles.notificationContainer}
        // onPress={toggleIsDone}
      >
      <View style={{flexDirection:"row"}}>
        
        <IonicIcon
            style={{ marginRight: 5 }}
            name={'book'}
            size={20}
            color={'black'}
          />
        {/* <Text>{item?.review}</Text>
        <Text>{item?.score}</Text>
        <Text> {item?.user?.name}</Text> */}
        <View>
        <Text style={styles.notificationTitle}>     {CapitalizeString( item?.user?.name)}  -   {item?.score}⭐</Text>
        <Text style={styles.notificationSubtitle}>{CapitalizeString(item?.review)}</Text>
        </View>
        </View>

      </TouchableOpacity>
    );
  };

 
export default RenderReviews