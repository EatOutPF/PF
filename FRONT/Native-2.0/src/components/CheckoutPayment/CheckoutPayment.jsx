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



const CheckoutPayment = ({route}) => {  
    const { checkout } = route.params;
    // console.log("TODAY: ", checkout);

    const [readyToPay, setReadyToPay] = useState(false);
    const [result, setResult] = useState(null);

    const dispatch = useDispatch();
    const linkMercadoPago = useSelector(state => state?.checkoutLinkMP)

    // const url = linkMercadoPago
    // const redirectUrl = Linking.createURL("https://eatout.onrender.com/paymentstatus")
    const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'
    

    const styles = StyleSheet.create({
        text1: {
            fontFamily: "Inria-Sans-Regular",
            fontSize: 20,
        },
        confirmButton: {
            flexDirection: 'row',
            backgroundColor: readyToPay ? "#00C3F8": "gray",
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
            height: 500,
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
          input: {
            width: 250,
            height: 60,
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



    useEffect(()=>{
        // const timer = setTimeout(() => {    //  ESTO SIMULA EL BACK LO QUE TARDA EN RESPONDER
        //     // Lógica a ejecutar después de 3 segundos
        //     checkoutLinkMP = "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1333194536-1d8d2b23-3a56-4fa7-93f8-5a52a97c05c0"
        //     setReadyToPay(true)
        // }, 3000);

        if(linkMercadoPago === ""){
            console?.log("ESTOY EN EL IF LINK VACIO,");
            dispatch(getLinkMercadoPago(checkout));
        }
        else{

            console?.log("mp link useefect else: ", linkMercadoPago);
            setReadyToPay(true)
        }
    }, [linkMercadoPago] )

    // console?.log("DATA checkout-resto, ", resto);
    // console?.log("DATA checkout-reserve, ", reserve);

    const navigation = useNavigation();
    const handleBackMercadoPago = async () => {
        // console.log("OBJETO CHECKUT: ", checkout);
        console?.log("link mp: ", linkMercadoPago);

        // let result = await WebBrowser.openBrowserAsync(Linking.openURL(`${linkMercadoPago}?back_url=${encodeURIComponent(redirectUrl)}`));
        let result = await WebBrowser.openBrowserAsync(linkMercadoPago);

            // "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1333194536-1d8d2b23-3a56-4fa7-93f8-5a52a97c05c0"
        setResult(result);
        // const checkout = {
        //     resto: resto,
        //     reserve: reserve,
        // }
        navigation?.navigate("Estado de la Reserva", checkout)
    };

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
                <View style={styles.input}>
                  <Text style={styles.title}>NOMBRE RESTAURANT</Text>
                  <Text style={styles.subtitle}>{checkout?.resto?.name?.substring(0, 20)} </Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>CANTIDAD DE PERSONAS</Text>
                  <Text style={styles.subtitle}>{checkout?.reserve?.cantPersons} </Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>CANTIDAD DE MESAS</Text>
                  <Text style={styles.subtitle}>{checkout?.reserve?.table} </Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>FECHA / HORA </Text>
                  <Text style={styles.subtitle}>{checkout?.reserve?.date} / {checkout?.reserve?.time}</Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>MONTO A PAGAR</Text>
                  <Text style={styles.subtitle}>$ {checkout?.resto?.advance} </Text>
                </View>

              </View>
            
              <TouchableOpacity 
                style={styles.confirmButton} 
                title="Open WebBrowser" 
                disabled={!readyToPay}
                onPress={handleBackMercadoPago}>
                    {!readyToPay ?  <ActivityIndicator style={styles.loading} size="small" color="white" /> 
                    : 
                    <IonicIcon
                        name={"checkmark-outline"}
                        size={20}
                        color={'white'}   
                    />}
                    <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 17, color: 'white',
                        width:210, justifyContent: "center", textAlign: "center" }}>
                        Confimar reserva con MercadoPago </Text>

            </TouchableOpacity>

              {/* <TouchableOpacity onPress={() => logOut()} style={[styles.button, {backgroundColor: '#512e2e'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Cerrar sesion</Text>
              </TouchableOpacity> , textAlign: "center" */}

            </View>
          </BlurView>
        </ScrollView>
      </View>
    );

};



export default CheckoutPayment;