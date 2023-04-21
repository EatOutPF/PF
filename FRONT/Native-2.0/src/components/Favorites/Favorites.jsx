import { FlatList, Text, Image, Dimensions  } from 'react-native';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import {auth} from "../../../firebase-config.js"
import { fetchFavorites } from '../../redux/actions';

function FavoritesScreen() {
  const dispatch = useDispatch();
  const { width } = Dimensions.get('window');
  const { height } = Dimensions.get('window');

  //const favorites = useSelector(state => state.favorites);
  const userData = useSelector(state=>state?.userInfo)
  const [userLog, setUserLog] = useState(false);
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState(false)

  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     user ? setuserLogged(true) : setuserLogged(false);
  //     setUserId(user.uid);
  //     console.log(`ID del usuario: ${user.uid}`);
  //   });
  // }, []);

  useEffect(() => {
    userData?.login ? setUserLog(true) : setUserLog(false)
    // setFavorites(userData?.favorites)
  }, [userData])

  


  // useEffect(() => {
  //   dispatch(fetchFavorites(userId));
  // }, [dispatch, userId]);

  
  console.log(favorites)
  return (
    <View style={{ backgroundColor: "#efe4dc", width: width, height: height}}>
    {!userLog ? 
      <Image source={require('../../img/no-favorites-no-user.jpg')} style={{ width: width }}  resizeMode="contain"/> : 
      (userData?.favorite?.length === 0 ? 
      <Image source={require('../../img/no-favorites.jpg')} style={{ width: width }}  resizeMode="contain"/> 
      :
      <FlatList
        data={favorites}
        renderItem={({ item }) => <Text>{item.name}</Text>}
        keyExtractor={item => item.id}
      />)
}
</View>
  );
}

export default FavoritesScreen;