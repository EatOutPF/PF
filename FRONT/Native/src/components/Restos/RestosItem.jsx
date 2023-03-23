import React from 'react'
import { Image, View, StyleSheet, Dimensions, Button } from 'react-native'
import StyledText from '../../styles/StyledText/StyledText.jsx'
import RepositoryStats from './RestosStats.jsx'
import theme from '../../styles/theme.js'

const { width } = Dimensions.get('window');
console.log("width screen", width);
let imageWidth = 0.5 * width;
let screenwidth = "100%"
if (width >= 1000) {imageWidth = width * 0.3; screenwidth = "50%";}

const RepositoryItemHeader = ({ images, name, menu, atmosphere, contact }) => (
  <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
    <View style={{ paddingRight: 10 }}>
      <Image style={styles.image} source={{ uri: images }} />
    </View>
    <View style={{ flex: 1 }}>
      <StyledText fontWeight='bold'>{name}</StyledText>
      <StyledText color='secondary'>Menu: {menu}</StyledText>
      <StyledText style={styles.language}>Atmosphere: {atmosphere}</StyledText>
      <StyledText color="claudioElMejor">{contact.email}</StyledText>

      {/* <Button title='Claudio' accessibilityLabel='Claudio' disabled="false"/> */}
    </View>
  </View>
)

const RepositoryItem = (props) => (
  <View key={props._id} style={styles.container}>
    <RepositoryItemHeader {...props} />
    <RepositoryStats {...props} />
  </View>
)

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
