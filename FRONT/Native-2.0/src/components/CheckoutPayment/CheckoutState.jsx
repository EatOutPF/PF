import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
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
    const [result, setResult] = useState("Pendiente");
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
            backgroundColor: "gray",
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



    useEffect(()=>{
        Hola()
        // const timer = setTimeout(() => {    //  ESTO SIMULA EL BACK LO QUE TARDA EN RESPONDER
        //     // Lógica a ejecutar después de 3 segundos
        //     checkoutLinkMP = "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1333194536-1d8d2b23-3a56-4fa7-93f8-5a52a97c05c0"
        //     setReadyToPay(true)
        // }, 3000);

        // const timer = setTimeout(() => {    //  ESTO SIMULA EL BACK LO QUE TARDA EN RESPONDER

        // axios
        //     .get(
        //     "https://eatout.onrender.com/paymentstatus",
        //     )
        //     .then((res) => console.log("PAYMENT STATUS:", res))
        //     // .catch(error){ console.log();}
        // }, 15000);

    }, [result])

    // console.log("Soy el checkout, ", resto);
    console.log("Soy el checkout-reserve, ", reserve);

    const navigation = useNavigation();
    const handleBackToHome = async () => {
        navigation.navigate("Eat Out")

    };

    async function Hola(){
        const {url} = await Linking.getInitialURL()
        if(url && url.includes("/statuspayment")){
            let algo = await axios.get(`https://eatout.onrender.com/paymentstatus/${external_reference}`)
            .then(res => {console.log('RES ' + (res))
                // console.log("res.data-status: ", res?.data[0]);
                // console.log("res.data-user: ", res?.data[1]);
                if(Array.isArray(res?.data)){
                    setResult(res?.data?.[0])
                    dispatch(setUserInfo(res?.data?.[1]))
                }
                // console.log("res.status: ", res?.status);
                // console.log("res.statustext: ", res?.statusText);
                // console.log("res.keys: ", Object?.keys(res));
                // console.log("RESULTADO AXIOS CLAUDIO: ", res?.data?.results[0]);
                // console.log("RESULTADO AXIOS CLAUDIO: ", res?.data?.results[0]);
                setResult(res?.data?.[0])})
            .then(error => console.log('ERROR boton claudio ' + error))
        }
    }

    const claudio = async () => {
        console.log("SOY CLAUDIO");
        console.log("ESTERNAL REFERENCE", external_reference);
        let algo = await axios.get(`https://eatout.onrender.com/paymentstatus/${external_reference}`)
        .then(res => {console.log('RES ' + (res))
            // console.log("res.data-status: ", res?.data[0]);
            // console.log("res.data-user: ", res?.data[1]);
            if(Array.isArray(res?.data)){
                setResult(res?.data?.[0])
                dispatch(setUserInfo(res?.data?.[1]))
            }
            // console.log("res.status: ", res?.status);
            // console.log("res.statustext: ", res?.statusText);
            // console.log("res.keys: ", Object?.keys(res));
            // console.log("RESULTADO AXIOS CLAUDIO: ", res?.data?.results[0]);
            // console.log("RESULTADO AXIOS CLAUDIO: ", res?.data?.results[0]);
            setResult(res?.data?.[0])})
        .then(error => console.log('ERROR boton claudio ' + error))
            
    }

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
                // disabled={!readyToPay}
                onPress={handleBackToHome}>
            
                <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}>Volver a Inicio </Text>

            </TouchableOpacity>
            <TouchableOpacity   style={styles.confirmButton} 
                title="claudio" 
                
                onPress={claudio}>
            
                <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}>Claudio </Text>
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