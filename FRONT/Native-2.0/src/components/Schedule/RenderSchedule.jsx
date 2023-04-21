import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CapitalizeString from '../CapitalizeString/CapitalizeString'
import { useNavigation } from '@react-navigation/native';


const RenderSchedule = ({ item }) => {
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

    const navigation = useNavigation();
    function handleMapToResto(){
      const resto = {
        _id: item?.restaurant?._id,
        name: item?.restaurant?.name,
        coordinate: item?.restaurant?.address?.coordinate,
        address: item?.restaurant?.address
      }
      navigation.navigate("🗺️ ¿ Comó llegar ?", { resto })

      // Alert.alert("aca se borra la noti")
    }

    function handleToDetail(value){
        // Alert.alert("aca se borra la noti")
        const _id = value
        navigation.navigate("Detalle Restaurant", {_id})
    }
    function handleResenias() {
        navigation.navigate("Comentar resenia", { resto: item?.restaurant })
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
                        color={'#efe4dc'}
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
          <Text style={styles.notificationTitle}>📅 {item?.date}    🕒 {item?.time}</Text>
          <Text style={styles.notificationTitle}>    {item?.restaurant?.name} </Text>
          <Text style={styles.notificationSubtitle}>Cantidad de mesas reservadas: {item?.table} </Text>
          <Text style={styles.notificationSubtitle}>{item?.restaurant?.address?.streetName} - N°: {item?.restaurant?.address?.streetNumber} </Text>
          <View style={{alignItems:"center"}}>
            <TouchableOpacity
                    style={{flexDirection:"row",alignItems: "center", marginRight: 5, marginVertical:5, 
                    backgroundColor: "#ff5b4f", padding: 5, paddingRight: 10, borderRadius: 10, width:150}}
                    onPress={() => handleResenias()}>
                      <IonicIcon
                        style={{ marginRight: 5 }}
                        name={'book'}
                        size={22}
                        color={'#efe4dc'}
                      />
                    <Text style={{color:"#efe4dc"}}>Comentar resenia</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: "row",}}>
            
            <TouchableOpacity 
              style={{flexDirection:"row",alignItems: "center", marginRight: 5, 
              backgroundColor: "#ff5b4f", padding: 5, paddingRight: 10, borderRadius: 10}}
              onPress={()=>handleToDetail(item?.restaurant?.name)}
            >
              <IonicIcon
                style={{ marginRight: 5 }}
                name={'arrow-redo-sharp'}
                size={22}
                color={'#efe4dc'}
              />
              <Text style={{color:"#efe4dc"}}>Detalle del Restaurant</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={{flexDirection:"row", alignItems: "center", backgroundColor: "#ff5b4f", 
              padding: 5, paddingRight: 10, borderRadius: 10}}
              onPress={()=>handleMapToResto()}
            >
              <IonicIcon
              style={{ marginRight: 5 }}
              name={'location-sharp'}
              size={22}
              color={'#efe4dc'}
              />
              <Text style={{color:"#efe4dc"}}>¿Comó llegar?</Text>

            </TouchableOpacity>
          </View>
        </View>
        ) : (
        <Text style={styles.notificationTitle}>| {item?.date} | {item?.time} | {item?.restaurant?.name?.substring(0, 10)}... |</Text>

        ) }

      </TouchableOpacity>
    );
  };

 
export default RenderSchedule