import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTypesOfFoods, getAtmosphere, getSections } from '../../redux/actions.js';


export default Filters = (props) => {
    const response = () => {
        props.handleBottonSheet()
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTypesOfFoods())
        dispatch(getSections())
        // dispatch(getAtmosphere())
    }, dispatch)

    const typesOfFoods = useSelector((state) => state.typesOfFoods);
    const typesOfSections = useSelector((state) => state.typesOfSections);
    // const typesOfAtmosphere= useSelector((state) => state.typesOfAtmosphere);
    const foodOptions = typesOfFoods?.map(e => {
        return {
            label: e.name,
            value: e.name,
        }
    })

    const [foods, setFoods] = useState(null);
    const [ambiences, setAmbiences] = useState(null);
    const [spaces, setSpaces] = useState(null);
    const [selectedValue4, setSelectedValue4] = useState(null);
    const [selectedValue5, setSelectedValue5] = useState(null);


    // const atmosphereOptions = typesOfAtmosphere?.map(e => {
    //     return {
    //         label: e.atmosphere,
    //         value: e.atmosphere,
    //     }
    // })

    const spaceOptions = typesOfSections?.map(e => {
        return {
            label: e.name,
            value: e.name,
        }
    })

    const ambienceOptions = [
        { label: 'Moderno', value: 'Moderno' },
        { label: 'Relajado', value: 'Relajado' },
        { label: 'Clasico', value: 'Clasico' },
    ];

    const menuOptions = [
        { label: 'Menu Celíaco', value: 'Menu Celíaco' },
        { label: 'Menu Vegano', value: 'Menu Vegano' },
        { label: 'Crypto', value: 'Menu Vegetariano' },
    ];
    const otherOptions = [
        { label: 'Sector Fumadores', value: 'Sector Fumadores' },
        { label: 'Pet Friendly', value: 'Pet Friendly' },
        { label: 'Crypto', value: 'Crypto' },
    ];

    return (
        <View>
            <View style={styles.cont}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Ordenar Por</Text>
                    <IonicIcon
                        style={styles.closeBottom}
                        name="close-circle-outline"
                        size={22}
                        onPress={() => response()}
                    />
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.containerOrderButtons}>
                    <ScrollView
                        showsHorizontalScrollIndicator={false}
                        horizontal
                    >
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Calificación</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Distancia</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>MayorPrecio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>MenorPrecio</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={styles.containerP}>
                    <View style={styles.containerPiker}>
                        <View style={styles.labelContainer}>
                            <IonicIcon name="fast-food-outline" style={styles.labelIcon} />
                            <Text style={styles.label}>Tipo de comida</Text>
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={foods}
                                onValueChange={(value) => setFoods(value)}
                            >
                                <Picker.Item label="Tipo de comida" value=""
                                />
                                {foodOptions.map((option) => (
                                    <Picker.Item
                                        key={option.value}
                                        label={option.label}
                                        value={option.value}
                                    />
                                ))}
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.containerPiker}>
                        <View style={styles.labelContainer}>
                            <IonicIcon
                                name="beer-outline"
                                size={22}
                            />
                            <Text style={styles.label}>Ambiente</Text>
                        </View>

                        <Picker
                            selectedValue={ambiences}
                            onValueChange={(value) => setAmbiences(value)}
                        >
                            <Picker.Item label="Ambiente" value="" />
                            {ambienceOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.containerPiker}>
                        <View style={styles.labelContainer}>
                            <IonicIcon
                                name="partly-sunny-outline"
                                size={22}
                            />
                            <Text style={styles.label}>Espacios</Text>
                        </View>
                        <Picker
                            selectedValue={spaces}
                            onValueChange={(value) => setSpaces(value)}
                        >
                            <Picker.Item label="Espacios" value="" />
                            {spaceOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.containerPiker}>
                        <View style={styles.labelContainer}>
                            <IonicIcon
                                name="leaf-outline"
                                size={22}
                            />
                            <Text style={styles.label}>Cuenta con</Text>
                        </View>
                        <Picker
                            selectedValue={selectedValue4}
                            onValueChange={(value) => setSelectedValue4(value)}
                        >
                            <Picker.Item label="Cuenta con" value="" />
                            {menuOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>

                    <View style={styles.containerPiker}>
                        <View style={styles.labelContainer}>
                            <IonicIcon
                                name="paw-outline"
                                size={22}
                            />
                            <Text style={styles.label}>Otros</Text>
                        </View>
                        <Picker
                            selectedValue={selectedValue5}
                            onValueChange={(value) => setSelectedValue5(value)}
                        >
                            <Picker.Item label="Otros" value="" />
                            {otherOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>
                </View>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cont: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        marginVertical: 1,
    },
    containerTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1
    },
    title: {
        color: 'Black',
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 20,
        paddingHorizontal: 8,
    },
    closeBottom: {
        flexDirection: 'row',
        alignItems: "flex-end",
        fontSize: 40,
        margin: 0.1,
        paddingVertical: 15,
    },
    containerOrderButtons: {
        margin: 5,
        paddingVertical: 5,
    },
    orderButton: {
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: '#FA6B6B',
        height: 30,
        borderRadius: 10,
        marginLeft: 2,
        marginRight: 2,
    },
    orderButtonText: {
        fontSize: 14,
        color: "white"
    },
    containerP: {
        flex: 1,
        padding: 0,
        marginTop: 10,
    },
    containerPiker: {
        paddingHorizontal: 16,
        paddingVertical: 0.1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        margin: 5,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelIcon: {
        fontSize: 20,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
    },
    picker: {
        // backgroundColor: 'red',
    },
})

