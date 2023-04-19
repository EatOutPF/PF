import React, {useState, useEffect} from 'react';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location"
import { Marker } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import restorantsJson from '../../../data/restaurants'
import { StyleSheet, View, Dimensions, Text, Emoji, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import Loading from '../Loading/Loading';

// function initMap() {
//     const myLatLng = { lat: -25.363, lng: 131.044 };
//     const map = new google.maps.Map(document.getElementById("map"), {
//       zoom: 4,
//       center: myLatLng,
//     });
  
//     new google.maps.Marker({
//       position: myLatLng,
//       map,
//       title: "Hello World!",
//     });
//   }

export default function App() {
    const restos = useSelector(state => state.allRestorants)
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)

    const [origin, setOrigen] = useState({
        latitude : 0, 
        longitude : 0
    
    })
    const [destination, setDestination] = useState({ 
        latitude : -33.744789, 
        longitude : -61.985766
    })

    useEffect( () => {
        if(origin?.latitude === 0)
            getLocationPermission()
        else
            setLoading(false)
    },[origin])

    async function getLocationPermission(){ // esto se puede aplicar en un useEffect para hcerlo en tiempo real
        let { status } = await Location.requestForegroundPermissionsAsync(); 
        // pide permiso para acceder a la ubicacion del usuario
        if(status !== "granted"){
            alert("Permision denied")
            return;
        }
        let location = await Location.getCurrentPositionAsync({});
        const current = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }
        setOrigen(current)
    }

    function handlerToDetail(value){
        //const _id = value       
        return(
            <Text onPress={()=>navigation.navigate("Detalle Restaurant", {_id:value})}>
                Ir al detalle
            </Text>
        )
    }

    const markerDescription = (
        // <TouchableOpacity onPress={() => navigation.navigate('AnotherComponent')}>
            <Text>Este eres tu.</Text>
        // </TouchableOpacity>
    );

    const [lastPress, setLastPress] = useState(0);

    const handleDoublePress = (value) => {
        const currentTime = new Date().getTime();
        const timeDelta = currentTime - lastPress;
        const doublePressDelay = 300; // milliseconds
    
        if (timeDelta < doublePressDelay) {
            console.log('Double Pressed!');
            navigation.navigate("Detalle Restaurant", {_id: value})
        }
    
        setLastPress(currentTime);
      };


return (
    <View style={styles.container}>
      {/* <MapView style={styles.map} /> */}
      {loading ? <Loading text="Cargando las coordenadas en el mapa..."/> :
        <View>
        <MapView
            // customMapStyle={mapStyle}            // habilitar esto para poner los colores del mapa
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude: -38.005003,
                longitude: -57.554361,
                latitudeDelta: 0.030,
                longitudeDelta: 0.030,
            }}
            mapType="standard"
        >

       

        {
            restos.map(item => (
                <Marker 
                    key={item?._id} 
                    coordinate={item?.address.coordinate}
                    title={item?.name}
                    description={item?.menu?.[0]}
                    pinColor='pink'
                    tappable={true}
                    onLongPress={()=> navigation.navigate("Detalle Restaurant", {_id: item?._id})}
  
                />
                )
            )
        }

        <Marker
            key="userUbication"
            coordinate={ origin }
            title="Ubicacion actual."
            description="Este eres tu."
            pinColor='green'
            draggable
            onDragEnd={(direction) => setOrigen(direction.nativeEvent.coordinate)}
        >
            {/* <Text style={{fontSize:30}}>🏠</Text> */}
        </Marker>

      </MapView>
      </View>}
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


// const [origin, setOrigen] = useState({ latitude : -33.724235 , longitude : -61.004941 })
// const [destination, setDestination] = useState({ latitude : -33.744014 , longitude : -61.958717 })

// return (
// <View style={styles.container}>
//   {/* <MapView style={styles.map} /> */}    
//     <MapView
//         customMapStyle={mapStyle}
//         // provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//             latitude: -33.745326,
//             longitude: -61.968774,
//             latitudeDelta: 0.035,
//             longitudeDelta: 0.035,
//         }}
//         mapType="standard"
//     >
//         <Marker 
//             coordinate={origin}
//         />

//     </MapView>