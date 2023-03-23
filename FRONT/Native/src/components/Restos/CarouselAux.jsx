import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
// import repositories from '../../data/repositories.js'
import restorantsJson from '../../../data/restaurants'


// const data = [
//   { id: 1, title: 'Item 1' },
//   { id: 2, title: 'Item 2' },
//   { id: 3, title: 'Item 3' },
//   { id: 4, title: 'Item 4' },
//   { id: 5, title: 'Item 5' },
//   { id: 6, title: 'Item 6' },
//   { id: 7, title: 'Item 7' },
//   { id: 8, title: 'Item 8' },
//   { id: 9, title: 'Item 9' },
//   { id: 10, title: 'Item 10' },
// ];
const repositories = restorantsJson;
const { width } = Dimensions.get('window');
console.log("width screen", width);
let imageWidth = 150;
// let screenwidth = "100%"
// if (width >= 1000) {imageWidth = width * 0.3; screenwidth = "50%";}

const CarouselAux = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? repositories.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === repositories.length - 1 ? 0 : activeIndex + 1);
  };

  const renderItem = ({ item, index }) => {

    {
      const isActive = index === activeIndex;
      const ownerAvatarUrl = item.images[0];

      return (
        <View style={[styles.itemContainer, isActive && styles.activeItemContainer]}>
          
          <Image style={styles.image} source={{ uri: ownerAvatarUrl }}></Image>
          
          <Text style={[styles.itemTitle, isActive && styles.activeItemTitle]}>{item.name}</Text>
                      {/* styles.itemTitle, isActive && styles.activeItemTitle */}
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
  },
  itemContainer: {
    width: 200,
    height: 200,
    marginHorizontal: 10,
    backgroundColor: '#FA6B6B',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // activeItemContainer: {
  //   backgroundColor: 'orange',
  // },
  itemTitle: {
    fontSize: 20,
    color: 'white',
  },
  activeItemTitle: {
    color: 'black',
  },
  arrowButton: {
    position: 'absolute',
    top: '40%',
    paddingHorizontal: 10,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  arrowButtonText: {
    fontSize: 30,
    color: 'white',
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 4
  }
});

export default CarouselAux