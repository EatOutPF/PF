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



const WebAdmin = () => {  
  

    // const redirectUrl = Linking.createURL("https://eatout.onrender.com/paymentstatus")
    const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'
    

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
            marginTop: 5,
            elevation: 5,
            shadowOffset: { width: 3, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.3,
            shadowRadius: 10,
            width: 250,
            height: 80,
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
            width: 360,
            height:500,
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
          input1: {
            width: 300,
            height: 350,
            borderColor: '#fff',
            borderWidth: 2,
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
            backgroundColor: '#ffffff90',
            marginBottom: 10
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
          }
    });



    // console?.log("DATA checkout-resto, ", resto);
    // console?.log("DATA checkout-reserve, ", reserve);

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
            
              <View>
                {/* <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                    Bienvenido {user?.name}</Text> */}
                

                <View style={styles.input1}>
                  <Text style={styles.title}>Informacion</Text>
                  <Text style={styles.subtitle}>¿Queres integrar tu resturante dentro de EatOut ? </Text>
                  <Text></Text>
                  <Text style={styles.subtitle}>No dudes en seguir el link debajo para entrar a la pagina de administracion de restaurantes y regristar el tuyo ! </Text>
                  <Text></Text>
                  <Text style={styles.subtitle}>Defini tus horarios, las fotos de tu restaurant, los tipos de menu y mas. </Text>
                  <Text></Text>

                  <Text style={styles.subtitle}> https://eatout-lac.vercel.app/ </Text>

                </View>


              </View>
            
              <TouchableOpacity 
                style={styles.confirmButton} 
                title="Open WebBrowser"
                onPress={async()=>{let result = await WebBrowser.openBrowserAsync("https://eatout-lac.vercel.app/")}}
              >
                    <IonicIcon
                        name={"earth-outline"}
                        size={20}
                        color={'white'} 
                        style={{paddingLeft:20}}  
                    />
                    <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 17, color: 'white',
                        width:210, justifyContent: "center", textAlign: "center" }}>
                        Continuar al Panel de Administracion de Restaurantes </Text>

            </TouchableOpacity>

            </View>
          </BlurView>
        </ScrollView>
      </View>
    );

};



export default WebAdmin;