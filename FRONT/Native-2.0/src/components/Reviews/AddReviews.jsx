import React,{useState, useRef}from "react";
import { StyleSheet, Text, View } from "react-native";
import {AirbnbRating, Avatar, Button, Input } from "react-native-elements";
import { Value } from "react-native-reanimated";
import { getAllRestorants, postListReviews } from "../../redux/actions";
import ListReviews from "./ListReviews";


export default function AddReviews ()  {
  
  const[ranking, setRanking] = useState();
  const[review, setReview] = useState("")
  const[errorReview, setErrorReview] = useState(null)
  const [loading, setLoading] = useState(false)

//   console.log(event.target.value);
//   setSocialMedia({
//     ...socialMedia,
//     facebook: event.target.value,
//   });
//   setErrorSocialMedia(
//     Validations({
//       ...errorSocialMedia,
//       facebook: event.target.value,
//     })
//   );
//   console.log(socialMedia);

  const handleAddReviews = () => {
  
    if (review.length === 0) {
      setErrorReview('Por favor realice un comentario');
    } else {
      setReview({
        ...review,
        review
      })
      setLoading(true);
      
      setLoading(false);
    }
  };

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
                  style={styles.texts}
                  multiline
                  errorMessage={errorReview}

                  />
                  <Button
                  title="Enviar Comentario"
                  containerStyle={styles.buttons}
                  buttonStyle={styles.btn}
                  onPress={handleAddReviews}
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
        justifyContent:"flex-end",
        marginTop:20,
        marginBottom:10,
        width:"95%",
    },

    btn:{
        backgroundColor:"blue"
    }
})