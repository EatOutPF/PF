import React from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';


const Favorites = () => {
  return (
    <Image source={require('../../img/no-favorites.jpg')} style={styles.fullscreenImage} />
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  fullscreenImage: {
    width: windowWidth,
    height: windowHeight,
    resizeMode: "stretch",
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Favorites;