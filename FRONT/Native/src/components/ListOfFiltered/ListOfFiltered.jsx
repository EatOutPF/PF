import React, {useEffect, useState} from 'react'
import { FlatList, Text, View } from 'react-native'
// import repositories from '../../data/repositories.js'
import RepositoryItem from './RestosItem.jsx'
import { useSelector, useDispatch,  } from 'react-redux';
import { filterCards, getAllRestorants, orderCards } from '../../redux/actions';


const ListOfFiltered = () => {  
  const dispatch = useDispatch();

  // let aux = restorantes && restorantes;
  // console.log("soy aux:", aux);

  // dispatch(getAllRestorants())
 
  
  // console.log("ALL : ", Object.keys(restorantes));
  const resto = useSelector(state => state.restorantsFound);
  const [restorantes, setRestorantes] = useState( [] );

  console.log("resto length: ", resto?.length);
  console.log("restorantes length: ", restorantes?.length);

  // if(restorantes?.length === 0) setRestorantes([...resto]);

  useEffect(() => {
    // let allrestos =     dispatch(getAllRestorants())
    console.log("soy el usefecct");
    if(restorantes?.length === 0) setRestorantes([...resto]);
    if(restorantes?.length !== resto?.length) setRestorantes([...resto]);
    dispatch(orderCards("rk"))

  }, []);

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

export default ListOfFiltered