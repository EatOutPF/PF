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
    alignItems: "flex-end",
    paddingTop: Constants.statusBarHeight + 10,
    width: '100%',
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
        <AppBarTab to='/'>Inicio</AppBarTab>
        <AppBarTab to='/restorantslist'>Listado</AppBarTab>
        <AppBarTab to='/mapview'>Mapa</AppBarTab>
        <AppBarTab to='/signin'>EJ1</AppBarTab>
        <AppBarTab to='/pagerview'>EJ2</AppBarTab>

      </ScrollView>
    </View>
  )
}

export default AppBar