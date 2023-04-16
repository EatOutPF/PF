import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { firebaseConfig } from '../../../firebase-config';

const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'

function CreateAccountFirebase({ navigation }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');


  const app = initializeApp(firebaseConfig);
  const authF = getAuth(app);


  function createAccount(value) {
    // console.log("soy el action:", value);
    // console.log("-------------------------------------------");
    return async () => {
        axios
            .post(`https://eatout.onrender.com"/users`, value)
            .then((response) => {
                console.log("RESPONSE del action -> ", response);
                // dispatch({
                //     type: GET_LINK_MERCADOPAGO,
                //     payload: response.data,
                // });
            })
            .catch((error) => {
                console.log("Error axion: ", error.message);
                // dispatch({
                //     type: GET_LINK_MERCADOPAGO,
                //     payload: error.message,
                // });
            });
    };
}

  const handleCreateAccount = () => {
    // createUserWithEmailAndPassword(authF, email, password)
    //   .then((userCredential) => {
    //     console.log('Account created!');
    //     Alert.alert('Account created!');
    //     const user = userCredential.user;
    //     console.log(user);
    //     navigation.navigate('Inicio');
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     Alert.alert(error.message);
    //   });


  };

    return (
      <View style={styles.container}>
        <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
        {/* <View style={{width: 100, height: 100, backgroundColor: 'purple', position: 'absolute' }}></View>
        <View style={{width: 100, height: 100, backgroundColor: 'blue', top: 120, position: 'absolute', transform: [{rotate: '25deg'}] }}></View>
        <View style={{width: 100, height: 100, backgroundColor: 'red', bottom: 120 ,position: 'absolute', borderRadius: 50, transform: [{rotate: '50deg'}] }}></View> */}
        <ScrollView contentContainerStyle= {{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}> 
          <BlurView intensity={100}>
            <View style={styles.login}>
            <Image 
                // style={styles.profilePicture}
                style={{margin:20, height:0}}
                source={require('../../img/name-eatout.jpeg')}
            />
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Nombre</Text>
                <TextInput onChangeText={(text) => setName(text)} style={styles.input} placeholder="nombre" />
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Telefono</Text>
                <TextInput onChangeText={(text) => setPhone(text)} style={styles.input} placeholder="telefono" secureTextEntry={true}/>
              </View>
              <View>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>E-mail</Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="usuario@mail.com" />
              </View>
              <View>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Password</Text>
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password" secureTextEntry={true} />
              </View>
              <View>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Repetir Password</Text>
                <TextInput onChangeText={(text) => setPasswordRepeat(text)} style={styles.input} placeholder="password" />
              </View>
              
              <TouchableOpacity  onPress={handleCreateAccount}style={[styles.button, {backgroundColor: '#512e2e'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </ScrollView>
      </View>
        // <View style={styles.container}>
        //   <BlurView intensity={100}>
        //     <View style={styles.login}>
        //       <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />

        //       <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>E-mail</Text>
        //       <TextInput onChangeText={(text) => setEmail(text)} style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} placeholder="usuario@mail.com" />
        //       <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Password</Text>
        //       <TextInput onChangeText={(text) => setPassword(text)} style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} placeholder="password" secureTextEntry={true} />
        //       <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Nombre</Text>
        //       <TextInput onChangeText={(text) => setEmail(text)} style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} placeholder="nombre" />
        //       <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Apellido</Text>
        //       <TextInput onChangeText={(text) => setEmail(text)} style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }} placeholder="apellido" />
        //       <TouchableOpacity onPress={handleCreateAccount} style={{ backgroundColor: '#512e2e', padding: 10, borderRadius: 5 }}>
        //       <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Create Account</Text>
        //       </TouchableOpacity>
        //     </View>
        //   </BlurView>
        // </View>
    );
}


const styles = StyleSheet.create({
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
      height: 600,
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
      height: 40,
      borderColor: '#fff',
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: '#ffffff90',
      marginBottom: 20
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

export default CreateAccountFirebase;