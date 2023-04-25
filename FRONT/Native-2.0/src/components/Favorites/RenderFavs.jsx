import React, { useState, useEffect } from 'react'
import { Image, Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CapitalizeString from '../CapitalizeString/CapitalizeString'
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements'
import { PostsFavorite } from '../../redux/actions';



const RenderFavs = ({ item }) => {
    const user = useSelector(state => state?.userInfo)
    const dispatch = useDispatch()
    console.log(item)
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
        image: {
          width: 75,
          height: 75,
          resizeMode: 'cover',
          borderRadius:10
        },
        notificationContainer: {
          flexDirection: 'row',
          backgroundColor: isDone ? '#ff5b4f' : '#ff9383' ,
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
          marginLeft: 20,
          color: '#000',
        },
        notificationSubtitle: {
          fontSize: 20,
          color: '#000',
          marginLeft: 1,
          fontWeight: 'bold',
        },
      });
  
     
      const navigation = useNavigation();
      function handleToDetail(value){
        // Alert.alert("aca se borra la noti")
        const _id = value
        navigation.navigate("Detalle Restaurant", {_id})
    }

    const handleAddFavorite = () => {

      
       dispatch(PostsFavorite(item?.restaurant?._id, user._id));
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
    <View style={{flexDirection:"row"}}>
      <Image style={styles?.image} source={{ uri: item?.restaurant?.images[0]}}/>
      <View style={{marginLeft:10}}>
      <Text style={styles.notificationSubtitle}>{item?.restaurant?.name.substring(0, 24)}... </Text>
        {item?.restaurant?.menu[0]?.length !== 0 &&<Text style={styles.notificationText}>Menu: {item?.restaurant?.menu[0]} </Text>}
        {item?.restaurant?.diets[0]?.length !== 0 && <Text style={styles.notificationText}>Dieta: {item?.restaurant?.diets[0]}</Text>}
        {item?.restaurant?.atmosphere[0]?.length !== 0 &&<Text style={styles.notificationText}>Atmósfera: {item?.restaurant?.atmosphere[0]}</Text>}
        <Text></Text>
      <View style={{flexDirection: "row",}}>
        
        <TouchableOpacity 
          style={{flexDirection:"row",alignItems: "center", marginRight: 5, 
          backgroundColor: "#ff9383", padding: 5, paddingRight: 10, borderRadius: 10}}
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
    </View>
    ) : (
      <View style={{flexDirection:"row"}}>
        <Image style={styles?.image} source={{ uri: item?.restaurant?.images[0]}}/>
        <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.title}>{item?.restaurant?.name?.substring(0, 18)}... </Text>
                {/* <TouchableOpacity onPress={handleAddFavorite}> */}
                    <IonicIcon
                        style={{ marginRight: 5, position: "absolute", left: 240, }}
                        name={'heart-dislike'}
                        size={35}
                        color={'#ff5b4f'}
                        onPress={handleAddFavorite}
                    />
                {/* </TouchableOpacity> */}
            
        </View>
    </View>
    ) }

  </TouchableOpacity>

    );
  };

 
export default RenderFavs