import React, {useEffect} from 'react'
import { FlatList, Text, View } from 'react-native'
// import repositories from '../../data/repositories.js'
import RepositoryItem from './RestosItem.jsx'
import { useSelector, useDispatch,  } from 'react-redux';
import { filterCards, getAllRestorants, orderCards } from '../../redux/actions';


const RestorantsList = () => {  
  const dispatch = useDispatch();

  // let aux = restorantes && restorantes;
  // console.log("soy aux:", aux);

  // dispatch(getAllRestorants())
 
  
  // console.log("ALL : ", Object.keys(restorantes));

  useEffect(() => {
    // let allrestos =     dispatch(getAllRestorants())
    dispatch(orderCards("rk"))

  }, []);
  const restorantes = useSelector(state => state.allRestorants);

  return (
    <View>
      <Text> Holaa </Text>
    <FlatList 
      data={restorantes} // de donde saca los datos para hacer la lista
      ItemSeparatorComponent={() => <Text> </Text>} // separa cada card con un espacio "Text"
      renderItem={({ item: repo }) => (
        <RepositoryItem {...repo} />
      )}
    />
    </View>
  )
}

export default RestorantsList