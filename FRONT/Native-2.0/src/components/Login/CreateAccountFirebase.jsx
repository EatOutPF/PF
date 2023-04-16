import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert, StyleSheet, Image, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';

import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { firebaseConfig } from '../../../firebase-config';

const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'

function CreateAccountFirebase({ navigation }) {

  const app = initializeApp(firebaseConfig);
  const authF = getAuth(app);

// ---------------------- Validations of Inputs ----------------------
  const [name, setName] = useState('');
  const [phone, setPhone] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [isValidName, setIsValidName] = useState(true);
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordRepeat, setIsValidPasswordRepeat] = useState(true);

  const validateName = (text) => {
    // Name validation logic
    const regex = /^[a-zA-Z\s]{5,}$/;
    const isValidName = regex.test(text);
    setName(text);
    setIsValidName(isValidName);
  };

  const validatePhone = (text) => {
    // Phone number validation logic
    const regex = /^[0-9]{10,}$/;
    const isValidPhone = regex.test(text);
    setPhone(text);
    setIsValidPhone(isValidPhone);
  };

  const validateEmail = (text) => {
    // Regular expression for email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(text);
    setEmail(text);
    setIsValidEmail(isValidEmail);
  };

  const validatePassword = (text) => {
    // Password validation logic
    const isValidPassword = text.length >= 6;
    setPassword(text);
    setIsValidPassword(isValidPassword);
  };

  const validatePasswordRepeat = (text) => {
    // Password validation logic
    const isValidPasswordRepeat = (text === password);
    setPasswordRepeat(text.value);
    setIsValidPasswordRepeat(isValidPasswordRepeat);

  };
// ---------------------- Validations of Inputs ----------------------

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
    // https://eatout.onrender.com/users
    // {
    //   "name": "santiago",
    //   "phone": 12344321,
    //   "email": "santi@gmail.com",
    //   "password": "123456"
    // }

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
                <TextInput
                  onChangeText={validateName}
                  style={[styles.input, !isValidName && styles.inputInvalid]}
                  placeholder="nombre"
                  value={name}
                  autoCapitalize="words"
                />
                {!isValidName && <Text style={styles.error}>El nombre debe tener minimo 5 letras.</Text>}
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Telefono</Text>
                <TextInput
                  onChangeText={validatePhone}
                  style={[styles.input, !isValidPhone && styles.inputInvalid]}
                  placeholder="(555) 555-5555"
                  value={phone}
                  keyboardType="phone-pad"
                />
                {!isValidPhone && <Text style={styles.error}>Ingresar un numero de telefono valido.</Text>}
              </View>
              <View>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>E-mail</Text>
                <TextInput
                  onChangeText={validateEmail}
                  style={[styles.input, !isValidEmail && styles.inputInvalid]}
                  placeholder="example@mail.com"
                  value={email}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
                {!isValidEmail && <Text style={styles.error}>Ingrese un email valido.</Text>}
              </View>
              <View>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Contraseña</Text>
                <TextInput
                  onChangeText={validatePassword}
                  style={[styles.input, !isValidPassword && styles.inputInvalid]}
                  placeholder="********"
                  value={password}
                  secureTextEntry={true}
                />
                {!isValidPassword && <Text style={styles.error}>La contraseña debe tener minimo 6 caracteres.</Text>}
              </View>
              <View>
                <Text style={{ fontSize: 17, fontWeight: '400', color: 'white' }}>Repetir Contraseña</Text>
                <TextInput
                  onChangeText={validatePasswordRepeat}
                  style={[styles.input, !isValidPasswordRepeat && styles.inputInvalid]}
                  placeholder="********"
                  value={passwordRepeat}
                  secureTextEntry={true}
                />
                {!isValidPasswordRepeat && <Text style={styles.error}>Las contraseñas deben coincidir. </Text>}
              </View>
              
              <TouchableOpacity  onPress={handleCreateAccount}style={[styles.button, {backgroundColor: '#512e2e'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </ScrollView>
      </View>
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
      marginVertical: 5,
      backgroundColor: '#ffffff90',
      marginBottom: 5
    },
    inputInvalid: {
      borderColor: 'red',
    },
    error: {
      color: 'red',
      fontSize: 12,
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