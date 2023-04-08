import React, {useState, useEffect} from 'react';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location"
import { Marker } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import { StyleSheet, View, Dimensions, Text, Emoji } from 'react-native';

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

    const [origin, setOrigen] = useState({
        latitude : -33.744014, 
        longitude : -61.958717
    
    })
    const [destination, setDestination] = useState({ 
        latitude : -33.744789, 
        longitude : -61.985766
    })

    useEffect( () => {
        getLocationPermission()
    },[])

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

return (
    <View style={styles.container}>
      {/* <MapView style={styles.map} /> */}
        <MapView
            customMapStyle={mapStyle}
            // provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude: -33.745326,
                longitude: -61.968774,
                latitudeDelta: 0.045,
                longitudeDelta: 0.045,
            }}
            mapType="standard"
        >
        <Marker
            key="ClaudioCasa"
            coordinate={ origin }
            title="Casa de claudio"
            description="aca vive claudio"
            draggable
            onDragEnd={(direction) => setOrigen(direction.nativeEvent.coordinate)}
        >
            <Text style={{fontSize:30}}>🏠</Text>
        </Marker>

        <Marker
            key="ClaudioTrabajo"
            coordinate={ destination }
            title="El trabajo de claudio"
            description="aca trabaja claudio di toro" 
            //TA y estudiante de Henry en la modalidad Part-time de la cohorte pt10a "

            draggable  // ESTA OPCION NOS PEMITE DRAGEAR UN MARKER Y POSICIONARLO EN OTRO LADO
            onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />

        <MapViewDirections 
            origin={origin}
            destination={destination}
            apikey={"AIzaSyA8wHVl7x6tJiALwmMYUL5h_l14X74f_A8"} // apikey de googlemaps de santi
            strokeColor="blue"
            strokeWidth={5}
        />

        <Polyline // crea una poligono
            coordinates={[origin, destination, {latitude : -33.744689,longitude : -61.986766}, {latitude : -33.744589,longitude : -61.985766}]}
            strokeColor="orange"
            strokeWidth={5}
        />
      </MapView>
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