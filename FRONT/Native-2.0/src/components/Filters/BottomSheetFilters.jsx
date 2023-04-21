import React, { useRef, useState } from 'react'
import 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';
import { BottomSheetModal, TouchableOpacity,} from '@gorhom/bottom-sheet'
import Filters from "../Filters/Filters"
import { useNavigation } from '@react-navigation/native';
import IonicIcon from 'react-native-vector-icons/Ionicons';



export default function BottonSheetFilters() {
    const bottomSheetModalRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    // const snapPoints = ['30%', '50%', '70%']
    const snapPoints = ['70%']
    const navigation = useNavigation();

    const handlePresentModal = () => {
        bottomSheetModalRef.current?.present();
        console.log(bottomSheetModalRef.current)
    }

    const handleBottonSheet = () => {
        bottomSheetModalRef.current.forceClose();
    };

    const handleMapDisplay = () => {
        navigation.navigate("Mapa")
    }

    {/*-------Flor*/ }
    return (
        <View style={styles.container}>
            {/* <Text>Esta al es de prueba en React Native 12.</Text> */}

            <View style={styles.buttons}>
            <TouchableOpacity style={{flexDirection:"row",  alignItems:"center"}}>
                <IonicIcon
                    name="filter-outline"
                    size={30}
                    onPress={handlePresentModal}
                />
                <Text>Filtros</Text>

            </TouchableOpacity>
            </View>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                index={0}
                snapPoints={snapPoints}
                backgroundStyle={{ borderRadius: 50 }}
                backgroundOpacity={0}
                enableDismissOnClose={true}
                onClose={() => setIsOpen(false)}
            >
                <View style={styles.contentContainer}>
                    <Filters
                        array={isOpen}
                        handleBottonSheet={handleBottonSheet}
                    />
                </View>
            </BottomSheetModal>

            <TouchableOpacity style={{flexDirection:"row", alignItems:"center"}}>
                <IonicIcon
                    name="map-outline"
                    size={30}
                    onPress={handleMapDisplay}
                />
                <Text>Mapa</Text>

            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: "row",
        backgroundColor: 'hsla(240, 100%, 50%, 0)',
        alignItems: 'center',
        justifyContent: "space-evenly",
    },

    contentContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    title: {
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 20,
        right: 100
    },

    itemTitle: {
        color: '#A81337',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        width: '80%',

        padding: 10,
        position: "absolute",
        left: 21,
        bottom: 5,
        borderRadius: 20,
        backgroundColor: "#D9D9D9"
    },
    buttons:{
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
     
    }
});
