import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { Button } from "react-native-elements"
import IonicIcon from 'react-native-vector-icons/Ionicons';
// import { useFocusEffect } from  'react-navigation';
import { useCallback } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default Filters = (props) => {

    const response = () => {
        props.handleBottonSheet()
    }

    const buttons = createBottomTabNavigator();

    return (
        <View>

            <Text styles={styles.title}>Ordenar por</Text>

            <IonicIcon
                style={styles.closeBottom}
                name="close-circle-outline"
                size={22}
                onPress={() => response()}
            />

            <View styles={styles.container}>
                <TouchableOpacity styles={styles.container} >
                    <View>

                        <Text>Calificación</Text>

                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Distancia</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={{ color: 'red' }}>Mayor Precio</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text>Menor Precio</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}


const styles = StyleSheet.create({


    title: {
        fontWeight: '900',
        letterSpacing: 1,
        fontFamily: 'Pass througt',
        fontSize: 50,
        right: 100
    },
    closeBottom: {
        position: "absolute",
        fontSize: 40,
        top: -5,
        alignSelf: "flex-end",
        left: 170,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    orderButtons: {

        alignItems: "",
        color: 'red',
        flexDirection: "column",

    }
})


