import React,{useEffect, useState}from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from "react-native";
import {AirbnbRating, Button, Input } from "react-native-elements";
import { Value, color } from "react-native-reanimated";
import { getAllRestorants, postListReviews } from "../../redux/actions";
import { firebase } from "@react-native-firebase/auth";
import { useDispatch,  useSelector  } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import DetailResto from "../DetailResto/DetailResto";

import IonicIcon from 'react-native-vector-icons/Ionicons';
import { BlurView } from 'expo-blur';
const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'


export default function AddReviews ({route})  {
  const {resto} = route?.params;
//   const user = useSelector( state => state?.userInfo)
//  const resto = useSelector( state => state?.restorantsFound)

  const dispatch = useDispatch();
  const navigation = useNavigation()
  const user = useSelector(state=>state?.userInfo)

  const[ranking, setRanking] = useState();
  const[review, setReview] = useState("")
  const[errorReview, setErrorReview] = useState(null)
  const [userLog, setUserLog] = useState(false);

  useEffect(() => {

    user?.login ? setUserLog(true) : setUserLog(false)
    
  }, [user])

  const styles = StyleSheet.create({
    text1: {
        fontFamily: "Inria-Sans-Regular",
        fontSize: 20,
    },
    confirmButton: {
        flexDirection: 'row',
        backgroundColor: "#512e2e",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 40,
        width: 300,
        marginTop: 5,
        elevation: 5,
        shadowOffset: { width: 3, height: 3 },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        width: 250,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
    },
    loading: {
        //   position: 'absolute',
        paddingRight: 3,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
      },
      login: {
        width: 350,
        height: 620,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
      },
      profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 1,
        marginVertical: 30
      },
      label1: {
        width: 290,
        height:125,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 10
      },
      label2: {
        width: 290,
        height: 350,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ffffff90',
        marginBottom: 10
      },
      label3: {
        width: 265,
        height: 300,
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 10,
        // padding: 10,
        marginVertical: 10,
        backgroundColor: '#fff',
        // marginBottom: 10
      },
      title:{
        fontSize: 12, 
        fontWeight: '400', 
        color: 'gray'
      },
      subtitle:{
        paddingLeft: 20,
        fontSize: 18, 
        fontWeight: 'bold',
        fontWeight: '400', 
        color: 'black'
      },
      button: {
        width: 250,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderColor: '#fff',
        borderWidth: 1,
      },
      body:{
        flex: 1
     },
 
     ranking:{
         height: 160,
        //  backgroundColor: "#f2f2f2"
     },
     comentReviews:{
         flex:1,
         backgroundColor:"red",
         alignItems:"center",
         marginTop:20,
         margin:2,
     },
    
     input:{
         marginBottom:10,
        //  backgroundColor :"red",
        width: '100%',
        height: 295,

            // borderWidth: 1,
            // borderColor: '#ccc',
            // borderRadius: 4,
            // paddingHorizontal: 15,
     },
        inputContainer: {
            width: 240,
            borderBottomWidth: 0,
          },
     texts:{
         height:10,
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
});


 function handleAddReviews ()  {
    try {
        const value = {
            resto: resto?._id,
            review: review,
            score: ranking,
            user: user?._id,
        }
    
        dispatch(postListReviews(value))
        navigation.navigate("Ranking-Reseñas", {resto})
        

    
    } catch (error) {
        
    }

   navigation.goBack()
   
  


}
    return(
        <View style={styles.container}>
        <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
        <ScrollView contentContainerStyle= {{
            flex: 1,
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
        }}> 
            <BlurView intensity={100}>
                <View style={styles.login}>
                
                <View>
                    {/* <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                        Bienvenido {user?.name}</Text> */}
                    <View style={styles.label1}>
                        <Text style={styles.title}>PUNTUACION</Text>
                    {/* <Text style={styles.subtitle}>{checkout?.resto?.name?.substring(0, 20)} </Text> */}
                        <View style={styles.ranking}>
                            <AirbnbRating
                            
                                count={5}
                                reviewColor=""
                                reviews={["Malo" , "Regular", "Normal", "Muy Bueno", "Excelente"]}
                                defaultRating={0}
                                size={25}
                                onFinishRating={(value)=> setRanking(value)}
                            />
                        </View>
                    </View>

                    <View style={styles.label2}>
                        <Text style={styles.title}>COMENTARIO</Text>
                        
                        <View style={styles.label3}>
                            <Input
                                placeholder="Comentario"
                                style={styles.input}
                                inputContainerStyle={styles.inputContainer}
                                onChangeText={(text) => setReview(text)}
                                multiline={true}
                                numberOfLines={14}
                                errorMessage={errorReview}
                            />
                            </View>
                        </View>

                </View>
                
                <TouchableOpacity 
                    style={styles.confirmButton} 
                    title="Open WebBrowser" 
                    // onPress={handleBackMercadoPago}
                >
                        
                        <IonicIcon
                            style={{marginLeft:20}}
                            name={"checkmark-outline"}
                            size={20}
                            color={'white'}   
                        />
                        <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 17, color: 'white',
                            width:210, justifyContent: "center", textAlign: "center" }}
                            title="Enviar Comentario"
                            onPress={()=>handleAddReviews()}>
                            Enviar Comentario </Text>

                </TouchableOpacity>

                {/* <TouchableOpacity onPress={() => logOut()} style={[styles.button, {backgroundColor: '#512e2e'}]}>
                    <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Cerrar sesion</Text>
                </TouchableOpacity> , textAlign: "center" */}

                </View>
            </BlurView>
            </ScrollView>
        </View>
    );

    // return(
    //     <View style={styles.body}>
           
    //         <View style={styles.ranking}>
    //             <AirbnbRating
    //             count={5}
    //             reviews={["Malo" , "Regular", "Normal", "Muy Bueno", "Excelente"]}
    //             defaultRating={0}
    //             size={25}
    //             onFinishRating={(value)=> setRanking(value)}
    //             />

    //         </View>
    //         <View style={styles.comentReviews}>
               
    //                <Input
    //               placeholder="Comentario"
    //               containerStyle={styles.input}
    //               onChangeText={(text) => setReview(text)}
    //               style={styles.texts}
    //               multiline
    //               errorMessage={errorReview}
                  

    //               />
    //               <Button
                  
    //               title="Enviar Comentario"
    //               containerStyle={styles.buttons}
    //               buttonStyle={styles.btn}
    //               onPress={()=>handleAddReviews()}
    //               />
    //         </View>
            
            
    //     </View>
    // )
}


