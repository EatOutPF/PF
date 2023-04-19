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
          backgroundColor: isDone ? '#ff9383' : '#512e2e' ,
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
          color: isDone ? '#512e2e' : '#ff9383' ,
        },
        notificationTitle: {
          fontSize: 20,
          fontWeight: "bold",
          // textDecorationStyle: "solid",
          color: isDone ? '#512e2e' : '#ff9383' ,
          // backgroundColor: "#ff5b4f"
          // marginLeft: 5,
        },
        notificationSubtitle: {
          fontSize: 18,
          color: isDone ? '#512e2e' : '#ff9383' ,
          marginLeft: 20,
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
        {isDone ? (
            <View>
                <TouchableOpacity 
                // onPress={()=>handleDeleteNotification()}
                >
                    <IonicIcon
                        style={{ marginRight: 5 }}
                        name={'restaurant'}
                        size={22}
                        color={'#2d8497'}
                    />
                    {/* <IonicIcon
                        style={{ marginRight: 5 }}
                        name={'close-circle-sharp'}
                        size={20}
                        color={'#2d8497'}
                    /> */}
                </TouchableOpacity>
            </View>
        ) : (
          <IonicIcon
            style={{ marginRight: 5 }}
            name={'restaurant-outline'}
            size={20}
            color={'#ff9383'}
          />
        )}
      { isDone ? (
        <View>
          <Text style={styles.notificationTitle}>{item?.restaurant?.name} - {item?.date}</Text>
          <Text style={styles.notificationSubtitle}>Hora: {item?.time}   -   Mesas: {item?.table} </Text>
          <Text style={styles.notificationSubtitle}>{item?.restaurant?.name}   -   {item?.time}</Text>
          <Text></Text>
          <View style={{flexDirection: "row",}}>
            
            <TouchableOpacity 
              style={{flexDirection:"row",alignItems: "center", marginRight: 15, backgroundColor: "#ff5b4f", padding: 5, paddingRight: 10, borderRadius: 10}}
            >
              <IonicIcon
                style={{ marginRight: 5 }}
                name={'arrow-redo-sharp'}
                size={22}
                color={'#2d8497'}
              />
              <Text>Detalle del Restaurant</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{flexDirection:"row", alignItems: "center", backgroundColor: "#ff5b4f", padding: 5, paddingRight: 10, borderRadius: 10}}
            >
              <IonicIcon
              style={{ marginRight: 5 }}
              name={'location-sharp'}
              size={22}
              color={'#2d8497'}
              />
              <Text>Como llegar</Text>

            </TouchableOpacity>
          </View>
        </View>
        ) : (
        <Text style={styles.notificationTitle}>{item?.restaurant?.name} - {item?.date}</Text>

        ) }

      </TouchableOpacity>
    );
  };

 
export default RenderNotification