// import React, {useState} from "react";
// import { View, Text, StyleSheet } from "react-native";
// import firebase from "firebase/app"
// import {Button} from "react-native-elements"
// import Login from "../Login/Login";


// export default function ListReviews({navigation, index}) {
//     const [userLogged, setUserLogged] = useState(false)

//     firebase.auth().onAuthStateChanged((user) => {
//         user ? setUserLogged(true) : setUserLogged(false)
//     })

//     return (
//    <View>
//      {
//         userLogged ? (
//             <Button
//             buttonStyle={style.btnReviews}
//             title = "Escribe una opinion"
//             titleStyle={style.titleReviews}
//             icon = {{
//                 type:"material-community",
//                 name:"square-edit-outline",
//                 color: "#a376c7"
//             }}
//             />

//         ) :(
//             <Text
//             style={style.buttonLog}
//             onPress={()=> navigation.navigate("login")}
//             >
//                  <Text style={style.login}>
//                 Para realizar tu opinion es necesario estar registrado.{""}
//                     Pulsa AQUÍ para iniciar seción.
//                  </Text>
//             </Text>

//         )
//      }
//    </View>
// )
// }

// const style= StyleSheet.create({
//     btnReviews:{
//      backgroundColor: "trasnparent"
//     },

//    titleReviews:{
//      color:"#a376c7"
//    },
   
//    buttonLog:{
//     textAlign:"center",
//     color:"#a376c7",
//     padding:20,

//    },
   
//    login:{

//     fontWeight:"bold"
//    }
   
   

// })