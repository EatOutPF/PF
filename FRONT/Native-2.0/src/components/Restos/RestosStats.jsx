import React from 'react'
import { View } from 'react-native'
import StyledText from '../../styles/StyledText/StyledText'

const parseThousands = value => {
  return value >= 1000
    ? `${Math.round(value / 100) / 10}k`
    : String(value)
}

const RepositoryStats = props => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width:'70%' }}>
      <View>
        <StyledText align='center' fontWeight='bold'>{parseThousands(props.diets)}</StyledText>
        <StyledText align='center'>Diets</StyledText>
      </View>
      <View>
        <StyledText align='center' fontWeight='bold'>{parseThousands(props.tables)}</StyledText>
        <StyledText align='center'>Tables</StyledText>
      </View>
      <View>
        <StyledText align='center' fontWeight='bold'>{props.room}</StyledText>
        <StyledText align='center'>Room</StyledText>
      </View>
      <View>
        <StyledText align='center' fontWeight='bold'>{props.extras.name}</StyledText>
        <StyledText align='center'>Extras</StyledText>
      </View>
    </View>
  )
}

export default RepositoryStats