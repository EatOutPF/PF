import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native"
import IonicIcon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker'
import { useState } from "react";

export default Filters = (props) => {
    const response = () => {
        props.handleBottonSheet()
    }
    const [selectedValue, setSelectedValue] = useState(null);
    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];
    return (

        <View style={styles.container}>

            <View style={{ backgroundColor: 'yellow' }}>
            <View>
                <IonicIcon
                    style={styles.closeBottom}
                    name="close-circle-outline"
                    size={22}
                    onPress={() => response()}
                />
            <Text styles={styles.title}>Ordenar por</Text>

            </View>
           </View>



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
                        <IonicIcon
                            name="fast-food-outline"
                            size={20}
                        />
                        <Text style={styles.label}>Tipo de comida</Text>
                    </View>
                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                    >
                        <Picker.Item label="Tipo de comida" value="" />
                        {options.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
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
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                    >
                        <Picker.Item label="Ambiente" value="" />
                        {options.map((option) => (
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
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                    >
                        <Picker.Item label="Espacios" value="" />
                        {options.map((option) => (
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
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                    >
                        <Picker.Item label="Cuenta con" value="" />
                        {options.map((option) => (
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
                        selectedValue={selectedValue}
                        onValueChange={(value) => setSelectedValue(value)}
                    >
                        <Picker.Item label="Otros" value="" />
                        {options.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                </View>
            </View>

        </View>

    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
    },
    title: {
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 20,
        right: 100,
        backgroundColor: 'orange',
    },
    closeBottom: {
        flexDirection: 'row',
        alignItems: "flex-end",
        justifyContent: 'flex-start',
        fontSize: 40,
        alignSelf: "flex-end",
        margin: 10,
        paddingVertical: 15,
    },
    containerOrderButtons: {
        flex: 0.1,
        backgroundColor: 'red',
        padding: 3,
        

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
    },
    containerPiker: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 0.1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        backgroundColor: '#D9D9D9',
        margin: 8,
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
    },
})


