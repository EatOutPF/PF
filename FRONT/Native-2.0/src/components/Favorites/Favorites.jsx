import { FlatList, Text } from 'react-native';
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View } from 'react-native';
import {auth} from "../../../firebase-config.js"
import { fetchFavorites } from '../../redux/actions';

function FavoritesScreen() {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites);

  const [userId, setUserId] = useState(null);



  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ? setuserLogged(true) : setuserLogged(false);
      setUserId(user.uid);
      console.log(`ID del usuario: ${user.uid}`);
    });
  }, []);

  useEffect(() => {
    dispatch(fetchFavorites(userId));
  }, [dispatch, userId]);

  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => <Text>{item.name}</Text>}
      keyExtractor={item => item.id}
    />
  );
}

export default FavoritesScreen;