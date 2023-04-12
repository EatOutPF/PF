import React from 'react'
import { View,Text, Image, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, ScrollView } from 'react-native'
// import DualRingLoader from "./CircleLoader"
import StyledText from '../../styles/StyledText/StyledText'

// import logo from "../../img/logo-name-banner-eatout"

const Loading = ({ children, to }) => {
    return (
        <View style={styles.container} > 
            {/* <DualRingLoader /> */}
            <Image style={styles.image} 
                source={require('../../img/png/eatout-logo-name-eslogan.png')}
            ></Image>
            <Text>Buscando los Restaurantes cercanos...</Text>
            <ActivityIndicator style={styles.loading} size="large" color="#FA6B6B" />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        
      width: 300,
      height: 300,
      borderRadius: 100,
    },
    loading: {
    //   position: 'absolute',
      paddingTop: 20,
    },
  });


export default Loading