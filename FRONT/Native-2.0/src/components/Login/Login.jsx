import React, {useEffect, useState} from 'react';
import { Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { BlurView } from 'expo-blur';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  } from 'firebase/auth';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import 'expo-dev-client';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import Logo from "../../img/logo-eatout.jpeg"
import Profile from '../Profile/Profile';
import CreateAccountFirebase from './CreateAccountFirebase';
import { getUserInfo, setUserToken } from '../../redux/actions';
import ProfileFirebase from '../Profile/ProfileFirebase';

const uri = 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/light-salmon-abstract-low-polygon-background-aloysius-patrimonio.jpg'
// import profilePicture from '../../img/png/eatout-logo-name.png'

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

  function LoginScreen() {

    const [log, setLogin] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation();
    // const utoken = useSelector(state => state.userToken?.stsTokenManager?.accessToken)
    const dispatch = useDispatch();
    const logUser = useSelector(state => state?.userInfo)
    console.log("LOGIN, user lof ??: ", logUser);
    const app = initializeApp(firebaseConfig);
    const authF = getAuth(app);

    GoogleSignin.configure({
      webClientId: "716033457346-uiqt23knlrpkkcp12d8da9qmp4pptfja.apps.googleusercontent.com",
    });


    const handleCreateAccount = () => {
      // createUserWithEmailAndPassword(authF, email, password)
      // .then((userCredential) => {
      //   console.log('Account created!')
      //   Alert.alert('Account created!')
      //   const user = userCredential.user;
      //   console.log(user)
      // })
      // .catch(error => {
      //   console.log(error)
      //   Alert.alert(error.message)
      // })
      navigation.navigate('Crear Cuenta');
    }

    const handleSignIn = () => {
      
      signInWithEmailAndPassword(authF, email, password)
      .then((userCredential) => {
        console.log('Signed in!')
        const user = userCredential.user;
        console.log(user)
        // dispatch(setUserToken(user))
        dispatch(getUserInfo(user))
        navigation.navigate('Perfil de Usuario', {user});
      })
      .catch(error => {
        Alert.alert("Error",error.message)
        console.log(error)
      })
    }

    const onGoogleButtonPress = async() => { // ESTO ANDA PERO NO ES VALIDO EL TOKEN QUE LLEGA
      // // Check if your device supports Google Play
      // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // // Get the users ID token
      // const { idToken } = await GoogleSignin.signIn();
    
      // // Create a Google credential with the token
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    
      // // Sign-in the user with the credential
      // // return auth().signInWithCredential(googleCredential);
      // const user_sing_in = auth().signInWithCredential(googleCredential);
      // user_sing_in
      //   .then((user)=> {
      //     console.log("user data: ", user);
      //     navigation.navigate('Bienvenido', {user});
          
      //   })
      //   .catch((error)=>{
      //     console.log("error >> : ", error);
      //   })
    }

    const handleLoginGoogle = async () => {
    
    
    }


    return (
      <>
      {
       logUser ? navigation.navigate('Perfil de Usuario', {logUser})
       : (
        
        <View style={styles.container}>
        <Image source={{ uri }} style={[styles.image, StyleSheet.absoluteFill]} />
        // {/* <View style={{width: 100, height: 100, backgroundColor: 'purple', position: 'absolute' }}></View>
        // <View style={{width: 100, height: 100, backgroundColor: 'blue', top: 120, position: 'absolute', transform: [{rotate: '25deg'}] }}></View>
        // <View style={{width: 100, height: 100, backgroundColor: 'red', bottom: 120 ,position: 'absolute', borderRadius: 50, transform: [{rotate: '50deg'}] }}></View> */}
        <ScrollView contentContainerStyle= {{
          flex: 1,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}> 
          <BlurView intensity={50}>
            <View style={styles.login}>
            <Image 
                style={styles.profilePicture}
                source={require('../../img/logo-eatout.jpeg')}
            />
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>E-mail</Text>
                <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="usuario@mail.com" />
              </View>
              <View>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Password</Text>
                <TextInput onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="password" secureTextEntry={true}/>
              </View>
              <TouchableOpacity onPress={handleSignIn} style={[styles.button, {backgroundColor: '#ff9383'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Iniciar sesion</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))} style={[styles.button, {backgroundColor: '#ff9383'}]}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                  <Image
                    style={{height:26, width:26, marginRight:5}}
                    source={require('../../img/png/google-logo.png')}

                  />
                  {/* <IonicIcon      
                        style={{marginRight:5}}            
                        name={"logo-google"}
                        size={20}
                        color={'white'}   
                    /> */}
                  <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Iniciar sesion con Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor: '#512e2e'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Crear Cuenta</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </ScrollView>
        </View>
        )}
    </>
    );
  }

  const Stack = createNativeStackNavigator();
  
  export default function Login() {
  return (
    
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Bienvenido" component={Profile} />
        <Stack.Screen name="Perfil de Usuario" component={ProfileFirebase} />
        <Stack.Screen name="Crear Cuenta" component={CreateAccountFirebase} />

      </Stack.Navigator>
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