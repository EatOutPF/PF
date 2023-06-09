import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import firebase from "firebase/app"
import { Button } from "react-native-elements"
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { postListReviews, searchRestorantById } from "../../redux/actions";
import { reauthenticateWithCredential } from "firebase/auth";
import RenderReviews from "./RenderReviews";



export default function ListReviews() {
  // const {resto} = route?.params();
  const user = useSelector(state => state?.userInfo)
  const [userLogged, setuserLogged] = useState(false)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restoData = useSelector(state => state?.restorantById)
  const reviewsResto = restoData?.review && [...restoData?.review]?.reverse();
  const renderItem = ({ item }) => (
    <RenderReviews item={item} />
  );

  useEffect(() => {
    if(restoData){
      dispatch(searchRestorantById(restoData._id))
    }
  }, [])


  // return (
  //   <View>
  //     <FlatList
      
  //       data={reviewsResto}
  //       renderItem={({ item }) => (
  //         <View style={styles.container}>
  //         <View key={item?.key}>
  //           <Text>{item?.review}</Text>
  //           <Text>{item?.score}</Text>
  //           <Text> {item?.user?.name}</Text>
  //         </View>
  //         </View>
  //       )}
  //     />
  //   </View>

  // )
  
  return(
    <View style={{ backgroundColor: "#efe4dc", height:"100%"}}>
        <FlatList
          style={{marginBottom: 28}}
          data={reviewsResto}
          keyExtractor={(item) => item?._id?.toString()}
          renderItem={renderItem}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 16,
    margin: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
  },
})