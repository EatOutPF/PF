import React, {useState} from "react";
import { View, Text, StyleSheet } from "react-native";
import firebase from "firebase/app"
import {Button} from "react-native-elements"
import Login from "../Login/Login";
import { auth, onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';

export default function ListReviews() {
     const [userLogged, setuserLogged] = useState(false)
     const navigation = useNavigation();
     
 

 
    return (
   <View>
    

  
            <Button
            onPress={()=> navigation.navigate("Reseñas")}
            buttonStyle={style.btnReviews}
            title = "Escribe una opinion"
            titleStyle={style.titleReviews}
            icon = {{
                type:"material-community",
                name:"square-edit-outline",
                color: "blue"
            }}
            />

  
        
            <Text
            style={style.buttonLog}
            onPress={()=> navigation.navigate("login")}
            >
                Para realizar tu opinion es necesario estar registrado.{""}
                 <Text style={style.login}>
                    Pulsa AQUÍ para iniciar seción.
                 </Text>
            </Text>


        
     
   </View>
)
}

const style= StyleSheet.create({
    btnReviews:{
     backgroundColor: "trasnparent"
    },

   titleReviews:{
     color:"blue"
   },
   
   buttonLog:{
    textAlign:"center",
    color:"blue",
    padding:20,

   },
   
   login:{

    fontWeight:"bold"
   }
   
   

})