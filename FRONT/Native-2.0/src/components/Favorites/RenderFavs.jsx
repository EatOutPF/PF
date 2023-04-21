import React, { useState, useEffect } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CapitalizeString from '../CapitalizeString/CapitalizeString'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'



const RenderFavs = ({ item }) => {
  const user = useSelector(state => state?.userInfo)
  const dispatch = useDispatch()
    
    const styles = StyleSheet.create({
        title: {
          fontSize: 24,
          fontWeight: 'bold',
          marginVertical: 16,
          marginHorizontal: 8,
          color: '#fff',
        },
        image: {
          width: '50%',
          height: 250,
          resizeMode: 'cover',
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
          fontWeight: 'bold',
        },
      });
      const [isDone, setIsDone] = useState(false);
  
      const toggleIsDone = () => {
        setIsDone(!isDone);
      };
      const navigation = useNavigation();
      function handleToDetail(value){
        // Alert.alert("aca se borra la noti")
        const _id = value
        navigation.navigate("Detalle Restaurant", {_id})
    }

    const handleAddFavorite = () => {

      
       dispatch(PostsFavorite(item?.restaurant[0]?._id, user._id));
      // dispatch(searchRestorantById(_id));
      // alert('Restaurante agregado a favoritos');
      //console.log(`Enviando restauran: ${restaurant}, user ${user}`);
  
  
    };

    return (

    <TouchableOpacity
    style={styles.notificationContainer}
    onPress={toggleIsDone}
  >
  { isDone ? (
    <View>
      <Image style={styles?.image} source={{ uri: item?.restaurant[0]?.images[0]}}/>
      <Text style={styles.notificationSubtitle}>{item?.restaurant[0]?.name} </Text>
      {item?.restaurant[0]?.menu[0]?.length !== 0 &&<Text style={styles.notificationText}>Menu: {item?.restaurant[0]?.menu[0]} </Text>}
      {item?.restaurant[0]?.diets[0]?.length !== 0 && <Text style={styles.notificationText}>Dieta: {item?.restaurant[0]?.diets[0]}</Text>}
      {item?.restaurant[0]?.atmosphere[0]?.length !== 0 &&<Text>Atmósfera: {item?.restaurant[0]?.atmosphere[0]}</Text>}
      <View style={{flexDirection: "row",}}>
        
        <TouchableOpacity 
          style={{flexDirection:"row",alignItems: "center", marginRight: 5, 
          backgroundColor: "#ff5b4f", padding: 5, paddingRight: 10, borderRadius: 10}}
          onPress={()=>handleToDetail(item?.restaurant[0]?.name)}
        >
          <IonicIcon
            style={{ marginRight: 5 }}
            name={'arrow-redo-sharp'}
            size={22}
            color={'#efe4dc'}
          />
          <Text style={{color:"#efe4dc"}}>Detalle del Restaurant</Text>
        </TouchableOpacity>

      </View>
    </View>
    ) : (
      <View>
      <Image style={styles?.image} source={{ uri: item?.restaurant[0]?.images[0]}}/>
    <Text style={styles.title}>{item?.restaurant[0]?.name?.substring(0, 10)}... |</Text>
    <View style={styles.viewFavortires}>
          <Icon 
            type= "material-community"
            name= "heart"
            onPress={handleAddFavorite}
            color= '#FF0000'
            size= {35}
            underlayColor="tranparent">

              </Icon>

            </View>
    </View>
    ) }

  </TouchableOpacity>

    );
  };

 
export default RenderFavs