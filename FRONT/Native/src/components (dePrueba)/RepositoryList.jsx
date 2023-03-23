import React from 'react'
import { FlatList, Text } from 'react-native'
import repositories from '../../data/repositories.js'
import RepositoryItem from '../components/Restos/RestosItem.jsx'

const RepositoryList = () => {
  return (
    <FlatList 
      data={repositories} // de donde saca los datos para hacer la lista
      ItemSeparatorComponent={() => <Text> </Text>} // separa cada card con un espacio "Text"
      renderItem={({ item: repo }) => (
        <RepositoryItem {...repo} />
      )}
    />
  )
}

export default RepositoryList