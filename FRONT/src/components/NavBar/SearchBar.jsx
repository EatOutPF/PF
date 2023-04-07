import React, {useEffect, useState} from 'react'
import { FlatList, Text, View, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch,  } from 'react-redux';
import { searchRestorantByString } from '../../redux/actions';


const SearchBar = () => {  
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const resto = useSelector(state => state.restorantsFound);

  const handleSearch = (text) => {
    setSearchText(text);
  }

  useEffect(() => {
    if (resto?.length === 0) {
      setSearchText("");
    }
  }, [resto]);

  useEffect(() => {
    if(searchText !== ""){
        dispatch(searchRestorantByString(searchText));
    }
    else{
        dispatch(searchRestorantByString(""));
    }

  }, [searchText]);

  return (

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Buscar..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
});

export default SearchBar