import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';
import { useDispatch, useSelector } from 'react-redux'
import { log } from 'react-native-reanimated';
import { getLinkMercadoPago, clearLinkMercadoPago } from '../../redux/actions';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from "react-native";
import {Linking} from "expo"
import { BlurView } from 'expo-blur';

// import { WebView } from 'react-native-webview';



const About = () => {  

    // console.log("TODAY: ", checkout);
   
    const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'
    

    const styles = StyleSheet.create({
        text1: {
            fontFamily: "Inria-Sans-Regular",
            fontSize: 20,
        },
        confirmButton: {
            flexDirection: 'row',
            backgroundColor: "#512e2e",

            borderRadius: 20,

            marginTop: 5,
            elevation: 5,
            shadowOffset: { width: 3, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowRadius: 10,
            width: 300,
            height: 40,
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
            width: 375,
            height: 670,
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 10,
            // padding: 20,
            justifyContent: "space-between",
            alignItems: 'stretch',
          },
          profile:{
            // justifyContent:"center",
            alignItems: "center"
          },
          profilePicture: {
            width: 125,
            height: 125,
            borderRadius: 70,
            borderColor: '#fff',
            borderWidth: 1,
            marginVertical: 5,
            marginHorizontal: 15

          },

          nameLabel: {
            alignItems: "center",
            
            width: 160,
            height: 50,
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 10,
            padding: 2,
            // marginVertical: 10,
            backgroundColor: '#efe4dc',
            marginBottom: 10,
            position: "absolute", 
            left: -5, 
            bottom: -30,
            marginRight:30,
          },
          nameLabelDer: {
            alignItems: "center",
            
            width: 160,
            height: 50,
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 10,
            padding: 2,
            
            // marginVertical: 10,
            backgroundColor: '#efe4dc',
            marginBottom: 10,
            position: "absolute", 
            right: -5, 
            bottom: -30
          },
          title:{
            fontSize: 16, 
            fontWeight: '400', 
            color: 'black'
          },
          subtitle:{
            // paddingLeft: 12,
            fontSize: 13, 
            fontWeight: 'bold',
            fontWeight: '400', 
            color: 'grey'
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
 
    });




    const navigation = useNavigation();

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
            
              
                {/* <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                    Bienvenido {user?.name}</Text> */}
                  <View style={{flexDirection:"row", justifyContent: "space-between", marginHorizontal: 20, marginBottom: 5}}>
                    <View style={styles.profile}>
                      <Image style={styles.profilePicture} 
                        source={ require("../../img/develop-profile-pic/barbara.png")}
                      />
                      <View style={styles.nameLabel}>
                        <Text style={styles.title}>Barbara Miranda</Text>
                        <Text style={styles.subtitle}>Back-MongoDB</Text>
                      </View>

                    </View>
                    <Image style={styles.profilePicture} 
                      source={ require("../../img/develop-profile-pic/diana.png")}
                    />
                    <View style={styles.nameLabelDer}>
                        <Text style={styles.title}>Diana Cañon</Text>
                        <Text style={styles.subtitle}>Front-React</Text>
                      </View>
                  </View>
                


                  <View style={{flexDirection:"row", justifyContent: "space-between", marginHorizontal: 20, marginBottom: 5}}>
                    <View style={styles.profile}>
                      <Image style={styles.profilePicture} 
                        source={ require("../../img/develop-profile-pic/florencia.png")}
                      />
                      <View style={styles.nameLabel}>
                        <Text style={styles.title}>Flor Marchiondelli</Text>
                        <Text style={styles.subtitle}>Front-Native</Text>
                      </View>

                    </View>
                    <Image style={styles.profilePicture} 
                      source={ require("../../img/develop-profile-pic/wilfredo.png")}
                    />
                    <View style={styles.nameLabelDer}>
                        <Text style={styles.title}>Wilfedo Morillo</Text>
                        <Text style={styles.subtitle}>Front-React</Text>
                      </View>
                  </View>

                  <View style={{flexDirection:"row", justifyContent: "space-between", marginHorizontal: 20, marginBottom: 5}}>
                    <View style={styles.profile}>
                      <Image style={styles.profilePicture} 
                        source={ require("../../img/develop-profile-pic/milton.png")}
                      />
                      <View style={styles.nameLabel}>
                        <Text style={styles.title}>Milton Sosa</Text>
                        <Text style={styles.subtitle}>Front-React</Text>
                      </View>

                    </View>
                    <Image style={styles.profilePicture} 
                      source={ require("../../img/develop-profile-pic/claudio.png")}
                    />
                    <View style={styles.nameLabelDer}>
                        <Text style={styles.title}>Claudi Di Toro</Text>
                        <Text style={styles.subtitle}>Back-MongoDB</Text>
                      </View>
                  </View>
                  
                  <View style={{flexDirection:"row", justifyContent: "center", marginHorizontal: 20 }}>
                    <View style={styles.profile}>
                      <Image style={styles.profilePicture} 
                        source={ require("../../img/develop-profile-pic/santiago.png")}
                      />
                      <View style={styles.nameLabel}>
                        <Text style={styles.title}>Santiago Bavaresco</Text>
                        <Text style={styles.subtitle}>Front-Native</Text>
                      </View>

                    </View>

                  </View>


              
            <View style={{flexDirection:"row", justifyContent: "center", marginHorizontal: 20, marginTop:10 }}>
              <TouchableOpacity 
                style={styles.confirmButton} 
                title="Open WebBrowser" 
                // disabled={!readyToPay}
                // onPress={handleBackMercadoPago}
                >
                    <IonicIcon
                        name={"logo-github"}
                        size={20}
                        color={'white'}   
                    />
                    <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 17, color: 'white',
                        width:210, justifyContent: "center", textAlign: "center" }}>
                        Repositorio del Proyecto </Text>

            </TouchableOpacity>
            </View>
              {/* <TouchableOpacity onPress={() => logOut()} style={[styles.button, {backgroundColor: '#512e2e'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Cerrar sesion</Text>
              </TouchableOpacity> , textAlign: "center" */}

            </View>
          </BlurView>
        </ScrollView>
      </View>
    );

};



export default About;