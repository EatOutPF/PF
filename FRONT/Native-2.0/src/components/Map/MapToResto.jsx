import React, {useState, useEffect} from 'react';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from "expo-location"
import { Marker } from 'react-native-maps';
import { mapStyle } from './mapStyle';
import { StyleSheet, View, Dimensions, Text, Emoji } from 'react-native';
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

export default function MapToResto({route}) {
    const { resto } = route.params;
    console.log("llegue acomo llegar",resto);
    console.log("llegue acomo llegar",resto?.coordinate?.latitude);
    const restoCordinates = {
        latitude: resto?.coordinate?.latitude,
        longitude: resto?.coordinate?.longitude
    }
    const [loading, setLoading] = useState(true)

    const [origin, setOrigen] = useState({
        latitude : 0, 
        longitude : 0
    
    })
    const [destination, setDestination] = useState({ 
        latitude : resto?.coordinate?.latitude, 
        longitude : resto?.coordinate?.longitude
    })
    // setDestination(resto?.coordinate)

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

return (
    <View style={styles.container}>
        {loading ? <Loading text="Cargando las coordenadas en el mapa..."/> :

      <View>
        <MapView
            customMapStyle={mapStyle}
            // provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude: -38.011083,
                longitude: -57.554361,
                latitudeDelta: 0.045,
                longitudeDelta: 0.045,
            }}
            mapType="standard"
        >
        <Marker
            key="ClaudioCasa"
            coordinate={ origin }
            title="Usted esta aqui."
            // description="aca vive claudio"
            draggable
            onDragEnd={(direction) => setOrigen(direction.nativeEvent.coordinate)}
        >
            <Text style={{fontSize:20}}>🏠</Text>
        </Marker>

        <Marker
            key={resto?._id}
            coordinate={ destination }
            title={resto?.name}
            description={`${resto?.address?.streetName} `} 
            
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

        {/* <Polyline // crea una poligono
            coordinates={[origin, destination, {latitude : -33.744689,longitude : -61.986766}, {latitude : -33.744589,longitude : -61.985766}]}
            strokeColor="orange"
            strokeWidth={5}
        /> */}
      </MapView>
      </View>
       }
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