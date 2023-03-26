import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Image, Dimensions, ImageBackground  } from 'react-native';
// import repositories from '../../data/repositories.js'
// import restorantsJson from '../../../data/restaurants'


// const repositories = restorantsJson;
const { width } = Dimensions.get('window');
// console.log("width screen", width);
let imageWidth = 200;
let imageHeight = 200;

// let screenwidth = "100%"
// if (width >= 1000) {imageWidth = width * 0.3; screenwidth = "50%";}

const CarouselAux = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // const handlePrev = () => {
  //   setActiveIndex(activeIndex === 0 ? repositories.length - 1 : activeIndex - 1);
  // };

  // const handleNext = () => {
  //   setActiveIndex(activeIndex === repositories.length - 1 ? 0 : activeIndex + 1);
  // };
  const handlePress = () => {
    Alert.alert('Aca va el Detail', 'Con todos los datos del resto.');
  };

  const renderItem = ({ item, index }) => {

    {
      const isActive = index === activeIndex;
      const ownerAvatarUrl = item.images[0];

      return (
        <View style={[styles.itemContainer]}>
            {/* styles.itemContainer, isActive && styles.activeItemContainer */}
            <TouchableOpacity onPress={handlePress}>
              <ImageBackground  style={styles.image} source={{ uri: ownerAvatarUrl }}>
                <Text style={[styles.itemTitle]}>{item.name}</Text> 
                <Text style={[styles.itemStar]}>⭐{item.ranking}</Text> 
                  {/* styles.itemTitle, isActive && styles.activeItemTitle */}

              </ImageBackground >
            </TouchableOpacity>
          
        </View>
      );
    }

  };

  return (
    <View style={styles.container}>

      {/* <TouchableOpacity style={styles.arrowButton} onPress={handlePrev}>
        <Text style={styles.arrowButtonText}>{'<'}</Text>
      </TouchableOpacity> */}
      
      <FlatList
        data={props.data}
        renderItem={renderItem}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={200}
        snapToAlignment="center"
      />
      {/* <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
        <Text style={styles.arrowButtonText}>{'>'}</Text>
      </TouchableOpacity> */}


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: 10
    
  },
  itemContainer: {
    width: 200,
    height: 200,
    marginHorizontal: 5,
    backgroundColor: '#FA6B6B',

    // justifyContent: 'flex-start',
    borderRadius: 10,

  },

  itemTitle: {
    color: '#A81337',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '80%',
    
    padding: 10,
    position: "absolute",
    left: 21,
    bottom: 5,
    borderRadius: 20,
    backgroundColor: "#D9D9D9"

  },

  itemStar: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,

    // width: '100%',
    position: "absolute",
    left: -57,
    top: 2,
    padding: 1,
  },
  
  image: {
    // flex: 1,
    borderRadius: 10,

    width: imageWidth,
    height: imageHeight,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
    // activeItemContainer: {
  //   backgroundColor: 'orange',
  // },
  // activeItemTitle: {
  //   color: 'black',
  // },
  // arrowButton: {
  //   position: 'absolute',
  //   top: '40%',
  //   paddingHorizontal: 10,
  //   backgroundColor: 'transparent',
  //   zIndex: 1,
  // },
  // arrowButtonText: {
  //   fontSize: 30,
  //   color: 'white',
  // },
});

export default CarouselAux