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
            <Text styles={styles.title}>Ordenar por</Text>
            <IonicIcon
                style={styles.closeBottom}
                name="close-circle-outline"
                size={22}
                onPress={() => response()}
            />
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
            <View>
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

            <View>

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

            <View>

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

            <View>

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

            <View>

                <Picker
                    selectedValue={selectedValue}
                    onValueChange={(value) => setSelectedValue(value)}
                >
                    <Picker.Item label="Otrosn" value="" />
                    {options.map((option) => (
                        <Picker.Item key={option.value} label={option.label} value={option.value} />
                    ))}
                </Picker>

            </View>

        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    title: {
        fontWeight: '900',
        letterSpacing: 1,
        fontSize: 20,
        right: 100,
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
    }
})


