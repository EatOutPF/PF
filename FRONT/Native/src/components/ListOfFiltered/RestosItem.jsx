import React from 'react'
import { Image, View, StyleSheet, Dimensions, TouchableOpacity, Button } from 'react-native'
import { Link, useLocation, Navigate } from 'react-router-native'
import StyledText from '../../styles/StyledText/StyledText.jsx'
// import RepositoryStats from './RestosStats.jsx'
import theme from '../../styles/theme.js'




const RepositoryItemHeader = ({ _id, images, name, menu, atmosphere, ranking }) => (
  <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
    
      <View style={{ paddingRight: 10 }}>
        <Image style={styles.image} source={{ uri: images?.[0] }} />
      </View>

      <View style={{ flex: 1 }}>
        <StyledText fontWeight='bold'>{name}</StyledText>
        <StyledText color='secondary'>Menu: {menu?.[0]}</StyledText>
        <StyledText style={styles.language}>Atmosfera: {atmosphere?.[0]}</StyledText>
        <StyledText color='secondary'>Ranking: {ranking}</StyledText>

        {/* <Button title='Claudio' accessibilityLabel='Claudio' disabled="false"/> */}
      </View>
  </View>
)

const RepositoryItem = (props) => (
  <View key={props?._id} style={styles.container}>
    <Link to={`/detail/${props?._id}`} component={TouchableOpacity} onPress={()=>handlePress} >
     <RepositoryItemHeader {...props} />
     </Link>
    {/* <RepositoryStats {...props} /> */}
  </View>
)

function handlePress (value) {
  // Alert.alert('Aca va el Detail', 'Con todos los datos del resto.');
  console.log("quiero entrar al detail, ", value);
  // dispatch(clearStateRestauranteById());
  // Navigate(`/detail/${value}`);
  console.log("quiero entrar al detail, ", value);

};

const { width } = Dimensions.get('window');
console.log("width screen", width);
let imageWidth = 0.5 * width;
let screenwidth = "100%"
if (width >= 1000) {imageWidth = width * 0.3; screenwidth = "50%";}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 5,
    // flexDirection: "column"
    width: screenwidth,
  },
  language: {
    padding: 4,
    color: theme.colors.white,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-start',
    marginVertical: 4,
    borderRadius: 4,
    overflow: 'hidden'
  },
  image: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: 4
  }
})

export default RepositoryItem
