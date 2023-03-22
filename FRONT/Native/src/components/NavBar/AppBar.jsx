import React from 'react'
import { View, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native'
import StyledText from '../../styles/StyledText/StyledText'
import Constants from 'expo-constants'
import theme from '../../styles/theme.js'
import { Link, useLocation } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.appBar.primary,
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 10,
    width: '100%',
    // flex: 1
  },
  scroll: {
    paddingBottom: 15
  },
  text: {
    color: theme.appBar.textSecondary,
    paddingHorizontal: 10
  },
  active: {
    color: theme.appBar.textPrimary
  }
})

const AppBarTab = ({ children, to }) => {
  const { pathname } = useLocation()
  const active = pathname === to

  const textStyles = [
    styles.text,
    active && styles.active
  ]

  return (
    <Link to={to} component={TouchableWithoutFeedback}>
      <StyledText fontWeight='bold' style={textStyles}>
        {children}
      </StyledText>
    </Link>
  )
}

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.scroll}>
        <AppBarTab to='/'>Restos</AppBarTab>
        <AppBarTab to='/signin'>Aaaa</AppBarTab>
        <AppBarTab to='/claudio'>Bbbb</AppBarTab>
        <AppBarTab to='/pagerview'>Cccc</AppBarTab>
        <AppBarTab to='/mapview'>Dddd</AppBarTab>



      </ScrollView>
    </View>
  )
}

export default AppBar