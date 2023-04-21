import React, {useEffect, useState} from 'react'
import { FlatList, Text, View, Alert } from 'react-native'
// import repositories from '../../data/repositories.js'
import SearchBar from '../NavBar/SearchBar.jsx';
import RestosItem from './RestosItem.jsx'
import { useSelector, useDispatch,  } from 'react-redux';
import { clearStateResatorantByString, clearSearchText } from '../../redux/actions';
import { getAllRestorants, clearStateResatorantById } from '../../redux/actions'


const ListOfFiltered = () => {  
  const dispatch = useDispatch();
  const resto = useSelector(state => state.restorantsFound);
  const [restorantes, setRestorantes] = useState( [...resto] );
  const restorantById = useSelector(state => state.restorantById);


  useEffect(() => {
    if(restorantes?.length === 0){
      dispatch(clearStateResatorantByString()); 
      setRestorantes([...resto]);
      dispatch(clearSearchText());
      Alert.alert("Nada para mostrar.", "", [
        {text: "OK", 
        onPress: () => {
          }
        } 
      ]);
     
    } else if(restorantes?.length !== resto?.length) {
      setRestorantes([...resto]);
    }

    if(Object?.keys(restorantById)?.length !== 0) dispatch(clearStateResatorantById())
  }, [resto, restorantes]);
  

  return (
    <View>
      <SearchBar />
    <FlatList 
      data={restorantes} // de donde saca los datos para hacer la lista
      ItemSeparatorComponent={() => <Text> </Text>} // separa cada card con un espacio "Text"
      renderItem={({ item: repo }) => (
        <RestosItem {...repo} />
      )}
    />
    </View>
  )
}

export default ListOfFiltered