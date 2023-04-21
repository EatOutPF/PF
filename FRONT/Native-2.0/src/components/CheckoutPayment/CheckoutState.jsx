import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, Image, ScrollView  } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import axios from "axios";
// import { WebView } from 'react-native-webview';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { setUserInfo } from '../../redux/actions';
import {Linking} from "expo"
import { BlurView } from 'expo-blur';
import CapitalizeString from '../CapitalizeString/CapitalizeString';
// import axios from 'axios';



const CheckoutState = ({route}) => {  
    const { resto, reserve } = route.params;
    const [readyToPay, setReadyToPay] = useState(false);
    const [result, setResult] = useState("pendiente");
    const [loadingToHome, setLoadingToHome] = useState(false);
    const [operationSuccess, setOperationSuccess] = useState(false);


    const dispatch = useDispatch();
    const external_reference = useSelector(state=> state?.checkoutExternalReferenceMP)
    // const linkMercadoPago = useSelector(state => state?.checkoutLinkMP)
    // const [url,setUrl] = useState("https://www.google.com/");
    const linkMercadoPago = useSelector(state => state?.checkoutLinkMP)
    const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'
    


    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        text1: {
            fontFamily: "Inria-Sans-Regular",
            fontSize: 20,
        },
        confirmButton: {
            flexDirection: 'row',
            backgroundColor: loadingToHome ? "green": "gray",
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
        },
        claudio: {
            flexDirection: 'row',
            backgroundColor: operationSuccess ? "green": (loadingToHome ? "grey" : "orange"),
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
        },
        loading: {
            //   position: 'absolute',
            paddingRight: 3,
        },
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
            height: 570,
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


    console.log("Soy el checkout-reserve, ", reserve);

    const navigation = useNavigation();
    const handleBackToHome = async () => {
        Alert.alert("Su reserva en el Restaurant fue confirmada con exito.  Gracias.")
        navigation.navigate("Eat Out")
    };


    const claudio = async () => {
        setLoadingToHome(true)
        setTextBotton("Procesando tu reserva")
        console.log("SOY CLAUDIO");
        console.log("ESTERNAL REFERENCE", external_reference);
        let algo = await axios.get(`https://eatout.onrender.com/paymentstatus/${external_reference}`)
        .then(res => {console.log('RES ' + (res))
            // console.log("res.data-status: ", res?.data[0]);
            // console.log("res.data-user: ", res?.data[1]);
            if(Array.isArray(res?.data)){
                setResult(res?.data?.[0])
                dispatch(setUserInfo(res?.data?.[1]))
                setLoadingToHome(false)
                setOperationSuccess(true)
                handleBackToHome()
            }
        })
        .then(error => {
            console.log('ERROR boton claudio ' + error) 
            setResult(error)
        })
            
    }

    // const [result, setResult] = useState(undefined);
    const claudito = async () => {
        console.log("SOY CLAUDIO");
        console.log("ESTERNAL REFERENCE", external_reference);
        if(result !== "approved"){
        let algo = await axios.get(`https://eatout.onrender.com/paymentstatus/${external_reference}`)
            .then(res => {
                console.log('RES ' + (res))
                console.log("res.data-status: ", res?.data[0]);
                // console.log("res.data-user: ", res?.data[1]);
                if(Array.isArray(res?.data)){
                    if(res?.data?.[0] === "approved"){
                        setResult(res?.data?.[0])
                        setLoadingToHome(true)
                        dispatch(setUserInfo(res?.data?.[1]))
                    }
                    else 
                        setResult(res?.data?.[0])

                }
            })
            .then(error => {
                console.log('ERROR boton claudio ' + error) 
                // setResult("pendiente")
            })
        }
      };
    
    //   useEffect(() => {
    //     if (result === "pendiente") {
    //         claudito();
    //     }
    //   }, [result]);

    const [textBotton, setTextBotton] = useState(`Confirmar reserva con el ${resto?.name?.substring(0, 15)}`)

    // return (
    //     <View style={styles.container}>
    //         <Text style={{backgroundColor: "yellow"}}>Estado de la reserva:  {result}</Text>
    //         <Text>Reservar en:  {resto?.name}</Text>
    //         <Text>Cantidad de Personas: {reserve?.cantPersons}</Text>
    //         <Text>Cantidad de mesas: {reserve?.table}</Text>
    //         <Text>Fecha / Hora : {reserve?.date} / {reserve?.time}</Text>
    //         <Text>Monto a Pagar: {resto?.advance}</Text>
    //         {/* <TouchableOpacity 
    //             style={styles.confirmButton} 
    //             title="Open WebBrowser" 
    //             disabled={!loadingToHome}
    //             onPress={handleBackToHome}>
    //             {!loadingToHome ?  <ActivityIndicator style={styles.loading} size="small" color="white" /> 
    //                 : 
    //                 <IonicIcon
    //                     name={"checkmark-outline"}
    //                     size={20}
    //                     color={'white'}   
    //                 />}
    //             <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}
    //                 >Volver a Inicio </Text>

    //         </TouchableOpacity> */}

    //         <TouchableOpacity   
    //             style={styles.claudio} 
    //             title="claudio" 
    //             disabled={loadingToHome}
    //             onPress={claudio}>
    //             {loadingToHome ?  
    //                 <ActivityIndicator style={styles.loading} size="small" color="white" /> 
    //                 : 
    //                     (operationSuccess ? 
    //                         <IonicIcon
    //                             name={"checkmark-outline"}
    //                             size={20}
    //                             color={'white'}   
    //                         />: 
    //                         <IonicIcon
    //                         name={"contract-sharp"}
    //                         size={20}
    //                         color={'white'}/>
    //                     )
    //             }
    //             <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}> {textBotton} </Text>
    //             </TouchableOpacity>
                
    //     </View>
    // );
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
                  <Text style={styles.title}>ESTADO DE PAGO</Text>
                  <Text style={styles.subtitle}>{CapitalizeString(result)} </Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>NOMBRE RESTAURANT</Text>
                  <Text style={styles.subtitle}>{resto?.name?.substring(0, 20)} </Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>CANTIDAD DE PERSONAS</Text>
                  <Text style={styles.subtitle}>{reserve?.cantPersons} </Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>CANTIDAD DE MESAS</Text>
                  <Text style={styles.subtitle}>{reserve?.table} </Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>FECHA / HORA </Text>
                  <Text style={styles.subtitle}>{reserve?.date} / {reserve?.time}</Text>
                </View>

                <View style={styles.input}>
                  <Text style={styles.title}>MONTO A PAGAR</Text>
                  <Text style={styles.subtitle}>$ {resto?.advance} </Text>
                </View>

              </View>

              <TouchableOpacity   
                style={styles.claudio} 
                title="payment" 
                disabled={loadingToHome}
                onPress={claudio}>
                {loadingToHome ?  
                    <ActivityIndicator style={styles.loading} size="small" color="white" /> 
                    : 
                        (operationSuccess ? 
                            <IonicIcon
                                name={"checkmark-outline"}
                                size={20}
                                color={'white'}   
                            />: 
                            <IonicIcon
                            name={"contract-sharp"}
                            size={20}
                            color={'white'}/>
                        )
                }
                <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}> {textBotton} </Text>
                </TouchableOpacity>
            
              {/* <TouchableOpacity 
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

            </TouchableOpacity> */}

              {/* <TouchableOpacity onPress={() => logOut()} style={[styles.button, {backgroundColor: '#512e2e'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Cerrar sesion</Text>
              </TouchableOpacity> , textAlign: "center" */}

            </View>
          </BlurView>
        </ScrollView>
      </View>
    );
};

export default CheckoutState;