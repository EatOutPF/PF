import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';
import { useDispatch, useSelector } from 'react-redux'
import { log } from 'react-native-reanimated';
import { getLinkMercadoPago, clearLinkMercadoPago } from '../../redux/actions';
import { useNavigation } from '@react-navigation/native';



const CheckoutPayment = ({route}) => {  
    const { checkout } = route.params;
    const [readyToPay, setReadyToPay] = useState(false);
    const [result, setResult] = useState(null);

    const dispatch = useDispatch();
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
            backgroundColor: readyToPay ? "green": "gray",
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

    let checkoutLinkMP = "";

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
        console?.log("link mp: ", linkMercadoPago);
        let result = await WebBrowser.openBrowserAsync(linkMercadoPago);
            // "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=1333194536-1d8d2b23-3a56-4fa7-93f8-5a52a97c05c0"
        setResult(result);
        // const checkout = {
        //     resto: resto,
        //     reserve: reserve,
        // }
        navigation?.navigate("Estado de la Reserva", checkout)
    };



    return (
        <View style={styles.container}>
            <Text>Reservar en: {checkout?.resto?.name}</Text>
            <Text>Cantidad de Personas: {checkout?.reserve?.cantPersons}</Text>
            <Text>Fecha / Hora : {checkout?.reserve?.date} / {checkout?.reserve?.time}</Text>
            <Text>Monto a Pagar: {checkout?.resto?.advance}</Text>
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
                    <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}>Confimar Reserva con Mercado Pago </Text>

            </TouchableOpacity>
                        <Text>{result && JSON?.stringify(result)}</Text>
        </View>
    );
};



export default CheckoutPayment;