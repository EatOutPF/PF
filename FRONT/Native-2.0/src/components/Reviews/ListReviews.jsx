import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase/app"
import {Button} from "react-native-elements"
import Login from "../Login/Login";
import { auth, onAuthStateChanged } from "firebase/auth";
import { useSelector ,  useDispatch} from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { postListReviews, searchRestorantById } from "../../redux/actions";



export default function ListReviews({route}) {
     const [userLogged, setuserLogged] = useState(false)
     const navigation = useNavigation();
     const {resto} = route.params;
     const { _id } = route.params;
     const dispatch = useDispatch();
     const reviews = useSelector((state) => state.restaurants.restaurantById?.reviews || []);
     
     useEffect(() => {
      dispatch(searchRestorantById(_id));
    }, [_id]);
   
   
 
    return (
   <View>
     <View>
      

    {searchRestorantById.reviews?.map((review, index) => (
      <View key={index} >
        <Text >{review.review}</Text>
        <Text>{review.score}</Text>
      </View>
    ))}
  </View>
</View>

  
)
}