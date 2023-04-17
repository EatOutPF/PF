import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import queryString from 'query-string';
import { useNavigation } from '@react-navigation/native';


export default function MyComponent() {
    const navigation = useNavigation();
  const [params, setParams] = useState(null);

  useEffect(() => {
    // // Obtener la cadena de consulta de la URL
    const search = navigation.getParam('search', '');
    // console.log("SOY SEARCH: ", search);
    // // Analizar la cadena de consulta usando query-string
    // const parsedParams = queryString?.parse(search);

    // setParams(parsedParams);
  }, []);

  if (!params) {
    return <View><Text>Cargando...</Text></View>;
  }

  return (
    <View>
      <Text>Parámetro 1: {params?.param1}</Text>
      <Text>Parámetro 2: {params?.param2}</Text>
    </View>
  );
}