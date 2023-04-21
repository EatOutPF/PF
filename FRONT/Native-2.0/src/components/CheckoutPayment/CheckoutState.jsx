import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import axios from "axios";
// import { WebView } from 'react-native-webview';

import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { setUserInfo } from '../../redux/actions';
import {Linking} from "expo"
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
    });


    console.log("Soy el checkout-reserve, ", reserve);

    const navigation = useNavigation();
    const handleBackToHome = async () => {
        Alert.alert("Gracias por confiar en EatOut")
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

    return (
        <View style={styles.container}>
            <Text style={{backgroundColor: "yellow"}}>Estado de la reserva:  {result}</Text>
            <Text>Reservar en:  {resto?.name}</Text>
            <Text>Cantidad de Personas: {reserve?.cantPersons}</Text>
            <Text>Cantidad de mesas: {reserve?.table}</Text>
            <Text>Fecha / Hora : {reserve?.date} / {reserve?.time}</Text>
            <Text>Monto a Pagar: {resto?.advance}</Text>
            <TouchableOpacity 
                style={styles.confirmButton} 
                title="Open WebBrowser" 
                disabled={!loadingToHome}
                onPress={handleBackToHome}>
                {!loadingToHome ?  <ActivityIndicator style={styles.loading} size="small" color="white" /> 
                    : 
                    <IonicIcon
                        name={"checkmark-outline"}
                        size={20}
                        color={'white'}   
                    />}
                <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}
                    >Volver a Inicio </Text>

            </TouchableOpacity>

            <TouchableOpacity   
                style={styles.claudio} 
                title="claudio" 
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
                        {/* <Text>{result && JSON.stringify(result)}</Text> */}
                        {/* <View style={css.container}> */}
            {/* {url &&
                <WebView
                        originWhitelist={['*']}
                        source={{uri: url}}
                        style={css.checkoutmp}
                        // startInLoadingState={true}
                        // onNavigationStateChange={state=>stateChange(state)}
                />
            } 
             <WebView
                source={{ uri: "https://www.google.com/" }}
                style={{ marginTop: 20 }}
            /> */}

    {/* </View> */}
        </View>
    );
};

export default CheckoutState;