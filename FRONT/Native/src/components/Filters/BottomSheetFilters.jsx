import React, { useRef, useState } from 'react'
import 'react-native-gesture-handler';
import { StyleSheet, View, Button } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import Filters from "../Filters/Filters"

export default function BottonSheetFilters() {
    const bottomSheetModalRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    // const snapPoints = ['30%', '50%', '70%']
    const snapPoints = ['70%']

    const handlePresentModal = () => {
        bottomSheetModalRef.current?.present();
        console.log(bottomSheetModalRef.current)
    }

    const handleBottonSheet = () => {
        bottomSheetModalRef.current.forceClose();
    };


    {/*-------Flor*/ } 
    return (
        <View style={styles.container}>
            {/* <Text>Esta al es de prueba en React Native 12.</Text> */}
            <Button title='Filtros' onPress={handlePresentModal} />
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={0}
                    snapPoints={snapPoints}
                    backgroundStyle={{ borderRadius: 50 }}
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

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});
