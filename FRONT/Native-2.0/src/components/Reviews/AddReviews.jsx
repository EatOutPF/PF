import React,{useState}from "react";
import { StyleSheet, Text, View } from "react-native";
import {AirbnbRating, Button, Input } from "react-native-elements";
import { Value } from "react-native-reanimated";
import { getAllRestorants, postListReviews } from "../../redux/actions";
import { firebase } from "@react-native-firebase/auth";
import { useDispatch,  useSelector  } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DetailResto from "../DetailResto/DetailResto";

export default function AddReviews ({route})  {
  const {resto} = route?.params;
  const user = useSelector( state => state?.userInfo)
//  const resto = useSelector( state => state?.restorantsFound)
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const[ranking, setRanking] = useState(1);
  const[review, setReview] = useState("")
  const[errorReview, setErrorReview] = useState(null)
  const [loading, setLoading] = useState(false)

 function handleAddReviews ()  {
    console.log("RANKING VALUE", ranking);
        const value = {
            resto: resto?._id,
            review: review,
            score: ranking,
            user: user?._id,
        }
        console.log(" VALUE", value);
    
        dispatch(postListReviews(value))
        const _id = resto?._id
        navigation.navigate("Detalle Restaurant", {_id})
        // navigation.navigate("Ranking-Reseñas", {resto})
        


//    navigation.goBack()



}


    return(
        <View style={styles.body}>
           
            <View style={styles.ranking}>
                <AirbnbRating
                count={5}
                reviews={["Malo" , "Regular", "Normal", "Muy Bueno", "Excelente"]}
                defaultRating={0}
                size={25}
                onFinishRating={(value)=> setRanking(value)}
                />

            </View>
            <View style={styles.comentReviews}>
               
                   <Input
                  placeholder="Comentario"
                  containerStyle={styles.input}
                  onChangeText={(text) => setReview(text)}
                  style={styles.texts}
                  multiline
                  errorMessage={errorReview}
                  

                  />
                  <Button
                  
                  title="Enviar Comentario"
                  containerStyle={styles.buttons}
                  buttonStyle={styles.btn}
                  onPress={()=>handleAddReviews()}
                  />
            </View>
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
       flex: 1
    },

    ranking:{
        height: 160,
        backgroundColor: "#f2f2f2"
    },
    comentReviews:{
        flex:1,
        alignItems:"center",
        marginTop:50,
        margin:10,
    },
   
    input:{
        marginBottom:10,

    },
    texts:{
        height:150,
        width:"100%",
        padding:0,
        margin:0
    },
    buttons:{
        flex:1,
        // justifyContent:"flex-end",
        // marginTop:20,
        // marginBottom:10,
        width:"95%",
    },

    btn:{
    borderRadius: 20,
    fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white', backgroundColor: '#ff5b4f',
    }
})