import React, {useEffect} from 'react'
import { FlatList, Text } from 'react-native'
// import repositories from '../../data/repositories.js'
import RepositoryItem from './RestosItem.jsx'
import { useSelector, useDispatch,  } from 'react-redux';
import { filterCards,getAllRestorants } from '../../redux/actions';


const RepositoryList = () => {  
 
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestorants())

  }, []);
  let restorantsFiltered = useSelector(state => state.allRestorants);
  
  return (
    <FlatList 
      data={restorantsFiltered} // de donde saca los datos para hacer la lista
      ItemSeparatorComponent={() => <Text> </Text>} // separa cada card con un espacio "Text"
      renderItem={({ item: repo }) => (
        <RepositoryItem {...repo} />
      )}
    />
  )
}

export default RepositoryList