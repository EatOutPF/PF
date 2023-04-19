import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CapitalizeString from '../CapitalizeString/CapitalizeString'

const RenderNotification = ({ item }) => {
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
          backgroundColor: isDone ? '#efe4dc' : '#ff9383' ,
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
        onPress={toggleIsDone}
      >
      <View style={{flexDirection:"row"}}>

        {isDone ? (
            <View>
                <TouchableOpacity onPress={()=>handleDeleteNotification()}>
                    <IonicIcon
                        style={{ marginRight: 5 }}
                        name={'checkmark-done-sharp'}
                        size={20}
                        color={'#2d8497'}
                    />
                    <IonicIcon
                        style={{ marginRight: 5 }}
                        name={'close-circle-sharp'}
                        size={20}
                        color={'#2d8497'}
                    />
                </TouchableOpacity>
            </View>
        ) : (
          <IonicIcon
            style={{ marginRight: 5 }}
            name={'checkmark-sharp'}
            size={20}
            color={'black'}
          />
        )}
        <Text style={styles.notificationText}>{item.message}</Text>
        </View>

      </TouchableOpacity>
    );
  };

 
export default RenderNotification