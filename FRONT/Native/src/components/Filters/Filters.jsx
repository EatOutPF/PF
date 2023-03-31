import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button } from "react-native"
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getTypesOfFoods,
    getAtmosphere,
    getSections,
    getDiet,
    getExtras,
    filterRestorant
} from '../../redux/actions.js';



export default Filters = (props) => {
    const response = () => {
        props.handleBottonSheet()
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTypesOfFoods())
        dispatch(getSections())
        dispatch(getAtmosphere())
        dispatch(getDiet())
        dispatch(getExtras())
    }, dispatch)

    const typesOfFoods = useSelector((state) => state.typesOfFoods);
    const typesOfSections = useSelector((state) => state.typesOfSections);
    const typesOfAtmosphere = useSelector((state) => state.typesOfAtmosphere);
    const typesOfDiet = useSelector((state) => state.typesOfDiet);
    const typesOfExtras = useSelector((state) => state.typesOfExtras);

    const foodOptions = typesOfFoods?.map(e => {
        return {
            label: e.name,
            value: e.name,
        }
    })

    const [menu, setMenu] = useState(null);
    const [ambiences, setAmbiences] = useState(null);
    const [spaces, setSpaces] = useState(null);
    const [diet, setDiet] = useState(null);
    const [extra, setExtra] = useState(null);

    const [filters, setFilters] = useState({
        menu: null,
        ambiences: null,
        spaces: null,
        diet: null,
        extra: null,
    });

    const atmosphereOptions = typesOfAtmosphere?.map(e => {
        return {
            label: e.name,
            value: e.name,
        }
    })

    const spaceOptions = typesOfSections?.map(e => {
        return {
            label: e.name,
            value: e.name,
        }
    })

    const dietOptions = typesOfDiet?.map(e => {
        return {
            label: e.name,
            value: e.name,
        }
    })

    const extraOptions = typesOfExtras?.map(e => {
        return {
            label: e.name,
            value: e.name,
        }
    })

    const otherOptions = [
        { label: 'Sector Fumadores', value: 'Sector Fumadores' },
        { label: 'Pet Friendly', value: 'Pet Friendly' },
        { label: 'Crypto', value: 'Crypto' },
    ];

    //HANDLERS:

    const handlerFilters = () => {
        dispatch(filterRestorant(filters));
        //despues me tiene que llevar a una nueva pestaña con todos los filtros aplicados
    }
    //Renderizado
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
                            <Text style={styles.orderButtonText}>Mayor Precio</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.orderButton}>
                            <Text style={styles.orderButtonText}>Menor Precio</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text style={styles.title}>Filtrar Por</Text>
                </View>

                <View style={styles.containerP}>
                    <View style={styles.containerPiker}>
                        <View style={styles.labelContainer}>
                            <IonicIcon name="fast-food-outline" style={styles.labelIcon} />
                            <Text style={styles.label}>Tipo de comida</Text>
                        </View>
                        <View style={styles.picker}>
                            <Picker
                                selectedValue={menu}
                                onValueChange={(value) => {
                                    setMenu(value),
                                        setFilters({ ...filters, menu: value })
                                }}
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
                            onValueChange={(value) => {
                                setAmbiences(value),
                                    setFilters({ ...filters, ambiences: value })
                            }}
                        >
                            <Picker.Item label="Ambiente" value="" />
                            {atmosphereOptions.map((option) => (
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
                            selectedValue={diet}
                            onValueChange={(value) => setDiet(value)}
                        >
                            <Picker.Item label="Cuenta con" value="" />
                            {dietOptions.map((option) => (
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
                            selectedValue={extra}
                            onValueChange={(value) => setExtra(value)}
                        >
                            <Picker.Item label="Otros" value="" />
                            {extraOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                    </View>
                </View>

            </View>

            <View style={{
                alignItems: 'center',
                height: 2,
                // backgroundColor: 'blue',
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'center',
                padding: 30,
            }}>

                <View style={styles.containerButtonFilter}>
                    <TouchableOpacity style={styles.bottonFilter}>
                        <Text style={styles.clearFilterButtonText}>
                            Limpiar filtros
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.containerButtonFilter}>
                    <TouchableOpacity style={styles.bottonFilter}
                    onPress={handlerFilters}
                    >
                        <Text style={styles.filterButtonText}>
                            Aplicar filtros
                        </Text>

                    </TouchableOpacity>
                </View>


            </View>
        </View>
        // </View >
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
        padding: 0,
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
        color: "white",
        fontWeight: 'bold',
    },
    containerP: {
        flex: 1,
        padding: 0,
        marginTop: 5,
    },
    containerPiker: {
        paddingHorizontal: 16,
        paddingVertical: 0.1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        margin: 5,

        elevation: 5, // sombreado en Android
        shadowOffset: { width: 2, height: 2 }, // sombreado en iOS
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: 10,
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

    containerButtonFilter: {
        height: 20,
        width: 130, // 
        justifyContent: 'center',
        flexDirection: 'row',
    },
    bottonFilter: {
        backgroundColor: '#FA6B6B',
        borderRadius: 8,
        width: 100,
        alignItems: 'center',
        elevation: 5, // sombreado en Android
    shadowOffset: { width: 3, height: 3 }, // sombreado en iOS
    shadowColor: 'black',
    shadowOpacity: 0.5,
    shadowRadius: 7,
    },
    filterButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '900',
        borderBottomColor: 'black',
    },
    clearFilterButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '300',
    }
})

