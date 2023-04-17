// import * as React from 'react';
// // import Env from 'react-native-config';
// import { Appbar } from 'react-native-paper';
// import { FlatList, SafeAreaView, Alert } from 'react-native';
// import { Provider as PaperProvider } from 'react-native-paper';
// import MercadoPagoCheckout from '@blackbox-vision/react-native-mercadopago-px';

// import { getProducts, getPreferenceId } from './services';

// import ProductCard from './ProductCard';
// import StatusBar from './StatusBar';

// const mercadoPagoKey = "TEST-5223583651329926-031722-a78a35cd9fecaafd7594d6d3f2d4f406-1333194536"
// const preferenceid = "1333194536-fffbf92f-3d87-4a44-950a-2b107cfa3a3b"

// export default function MercadoPago1() {
//   const products = getProducts();

//   const startCheckout = async ({ title, description, amount }) => {
//     try {
//       const preferenceId = await getPreferenceId('cditoro@gmail.com', {
//         title,
//         description,
//         quantity: 1,
//         currency_id: 'ARS',
//         unit_price: amount,
//       });

//       const payment = await MercadoPagoCheckout.createPayment({
//         publicKey: mercadoPagoKey,
//         preferenceId,
//       });

//       if (payment.status === 'in_process') {
//         Alert.alert(
//           'Payment In Progress',
//           'You will receive an email when the payment of the product is complete'
//         );
//       } else {
//         if (payment.status === 'rejected') {
//           Alert.alert(
//             'Payment Rejected',
//             'Please retry payment. If error persists contact support'
//           );
//         }

//         Alert.alert(
//           'Payment succeed',
//           'You will receive an email with the invoice of your product'
//         );
//       }
//     } catch (err) {
//       if (err.message.includes('cancel')) {
//         Alert.alert(
//           'Payment was cancelled',
//           'You can keep checking out our products'
//         );
//       } else {
//         Alert.alert(
//           'Payment checkout issue',
//           'Please retry payment. If error persists contact support'
//         );
//       }
//     }
//   };

//   return (
//     <PaperProvider>
//       <StatusBar />
//       <SafeAreaView style={{ flex: 1 }}>
//         <Appbar>
//           <Appbar.Content title="Products" />
//         </Appbar>
//         <FlatList
//           data={products}
//           keyExtractor={(item) => `${item.id}`}
//           renderItem={({ item }) => (
//             <ProductCard {...item} onPress={startCheckout} />
//           )}
//         />
//       </SafeAreaView>
//     </PaperProvider>
//   );
// }




// import React, { useState } from 'react';
// import { MercadoPagoCheckout } from 'react-native-checkout-mercadopago';
// import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

// const mercadoPagoKey = "TEST-5223583651329926-031722-a78a35cd9fecaafd7594d6d3f2d4f406-1333194536"
// const preference_id = "1333194536-fffbf92f-3d87-4a44-950a-2b107cfa3a3b"
// // import env from './app.json';

// import { initMercadoPago, Wallet } from '@mercadopago/sdk-js'
// initMercadoPago('mercadoPagoKey');

// const WalletContainer = () => {
//     return (
//       <View id="wallet_container" />
//     );
//   };

// const MercadoPago = () => {
//     const [status, setStatus] = useState(null);

//     const mercadopago = require("mercadopago");
//     // Agrega credenciales
//     mercadopago.configure({
//     access_token: mercadoPagoKey,
//     });

//     // Crea un objeto de preferencia
//     let preference = {
//         items: [
//         {
//             title: "Mi producto",
//             unit_price: 10,
//             quantity: 1,
//         },
//         ],
//     };
    
//     mercadopago.preferences
//         .create(preference)
//         .then(function (response) {
//         // En esta instancia deberás asignar el valor dentro de response.body.
//         // id por el ID de preferencia solicitado en el siguiente paso
//         })
//         .catch(function (error) {
//         console.log(error);
//         }); 






//     const handlePaymentClick = async () => {
//         try {
//             const enableDarkFont = false;
//             const backgroundColor = '#F44336';

//             updatePaymentStatus(null);

//             const payment = await MercadoPagoCheckout.startForPayment(mercadoPagoKey, preference_id, {
//                 backgroundColor,
//                 enableDarkFont
//             });
//             console.log("SOY MERCADOPAGO", payment);

//             updatePaymentStatus(JSON.stringify(payment, null, 2));
//         } catch (error) {
//             updatePaymentStatus(error.toString());
//         }
//     };

//     const handlePaymentDataClick = async () => {
//         try {
//             const enableDarkFont = false;
//             const backgroundColor = '#F44336';

//             updatePaymentStatus(null);

//             const payment = await MercadoPagoCheckout.startForPaymentData(mercadoPagoKey, preference_id, {
//                 backgroundColor,
//                 enableDarkFont
//             });

//             updatePaymentStatus(JSON.stringify(payment, null, 2));
//         } catch (error) {
//             updatePaymentStatus(error.toString());
//         }
//     };

//     const updatePaymentStatus = (status) => setStatus(status);

//     return (
//         <View style={styles.container}>
//             <Wallet initialization={{ preferenceId: '<PREFERENCE_ID>' }} />
//             <Text style={styles.instructions}>
//                 Tap the following button to start the checkout flow for Payment
//             </Text>
//             <TouchableHighlight style={styles.button} onPress={handlePaymentClick}>
//                 <Text style={styles.text}>
//                     CHECKOUT PRODUCT FOR $100
//                 </Text>
//             </TouchableHighlight>
//             <Text style={styles.instructions}>
//                 Tap the following button to start the checkout flow for Payment Data
//             </Text>
//             <TouchableHighlight style={styles.button} onPress={handlePaymentDataClick}>
//                 <Text style={styles.text}>
//                     CHECKOUT PRODUCT FOR $100
//                 </Text>
//             </TouchableHighlight>
//             <Text>
//                 {status}
//             </Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5FCFF',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     instructions: {
//         textAlign: 'center',
//         color: '#333333',
//         marginBottom: 5,
//     },
//     button: {
//         backgroundColor: '#4CAF50',
//         padding: 10,
//         margin: 10,
//         borderRadius: 5,
//     },
//     text: {
//         color: '#FFFFFF',
//         textAlign: 'center',
//     },
// });

// export default MercadoPago;



