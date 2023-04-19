import { FlatList, Text } from 'react-native';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import {auth} from "../../../firebase-config.js"
import { fetchFavorites } from '../../redux/actions';

function FavoritesScreen() {
  const dispatch = useDispatch();
  //const favorites = useSelector(state => state.favorites);
  const userData = useSelector(state=>state?.userInfo)
  const [userLog, setUserLog] = useState(false);
  const [userId, setUserId] = useState(null);
  const [favorites, setFavorites] = useState()


  // useEffect(() => {
  //   auth.onAuthStateChanged(user => {
  //     user ? setuserLogged(true) : setuserLogged(false);
  //     setUserId(user.uid);
  //     console.log(`ID del usuario: ${user.uid}`);
  //   });
  // }, []);

  useEffect(() => {
    userData.login ? setUserLog(true) : setUserLog(false)
    setFavorites(userData.favorites)
  }, [userData])


  // useEffect(() => {
  //   dispatch(fetchFavorites(userId));
  // }, [dispatch, userId]);
 
  return (
    <View style={{ backgroundColor: "#efe4dc"}}>
    {!userLog ? <Text>NO HAY USER LOG</Text> : 
    <FlatList
      data={favorites}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={item => item.id}
    />
}
</View>
  );
}

export default FavoritesScreen;