import React, {useEffect} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import 'expo-dev-client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { clearUserInfo } from '../../redux/actions';
const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'


export default function ProfileFirebase() {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const user = useSelector(state => state?.userInfo)
    // const { user } = route?.params;
    const profilePicture = user?.user?.photoURL
    console.log("ProfileFirebase COMPONENT -------------", user);
    console.log(typeof(user));
    console.log("ProfileFirebase COMPONENT keys -------------", Object?.keys(user));
    console.log("ProfileFirebase COMPONENT RESERVE-------------", user?.reserve);
    console.log("ProfileFirebase COMPONENT RESERVE restaurant-------------", user?.reserve?.[0]?.restaurant);


    const imageSources = [
      require('../../img/profile-pic/0.png'),
      require('../../img/profile-pic/1.png'),
      require('../../img/profile-pic/2.png'),
      require('../../img/profile-pic/3.png'),
      require('../../img/profile-pic/4.png'),
      require('../../img/profile-pic/5.png')
    ];
    const randomIndex = Math.floor(Math.random() * imageSources.length);
    const randomImageSource = imageSources[randomIndex];

    const logOut = () => {
        console.log("FLOR");
        // auth()
        //     .singOut()
        //     .then(()=> console.log("User sined out!"))
        // dispatch(clearUser)
        dispatch(clearUserInfo())
        navigation.navigate("Login")
        
    }

    return(
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
            <Image style={styles.profilePicture} 
                source={randomImageSource}
            ></Image>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>
                  Bienvenido {user?.name}</Text>
              </View>
              {/* <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Password</Text>
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password" secureTextEntry={true}/>
              </View>
              <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#ff5b4f'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor: '#512e2e'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Create Account</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={() => logOut()} style={[styles.button, {backgroundColor: '#512e2e'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Cerrar sesion</Text>
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