import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import RepositoryList from './RepositoryList'
import { useSelector, useDispatch } from 'react-redux';
import { getAllRestorants } from '../../redux/actions';


const SelectComponent = () => {

    const dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch (getAllRestorants());
    //   }, []);

  const [value1, setValue1] = useState("All");
  const [value2, setValue2] = useState("All");
  const [value3, setValue3] = useState("All");
  const [value4, setValue4] = useState("All");
  const [value5, setValue5] = useState("All");

const pickerRef = useRef();

function open() {
  pickerRef.current.focus();
}

function close() {
  pickerRef.current.blur();
}

  return (
    <View style={styles.container}>

        <Text style={styles.label}>MENU:</Text>
        <View>
            <Text> {value1}</Text>
                <Picker
                    ref={pickerRef}
                    selectedValue={value1}
                    onValueChange={(itemValue) => setValue1(itemValue)}
                >
                    <Picker.Item label="gourmet" value="gourmet" />
                    <Picker.Item label="italiana" value="italiana" />
                    <Picker.Item label="bares" value="bares" />
                </Picker>
        </View>

        <Text style={styles.label}>ATMOSFERA:</Text>      
        <View>
            <Text> {value2}</Text>
                <Picker
                selectedValue={value2}
                onValueChange={(itemValue) => setValue2(itemValue)}
                >
                    <Picker.Item label="musica en vivo" value="musica en vivo" />
                    <Picker.Item label="romantico" value="romantico" />
                    <Picker.Item label="familiar" value="familiar" />
                </Picker>
        </View>

        <Text style={styles.label}>SECCION:</Text>
        <View>
            <Text> {value3}</Text>
                <Picker
                selectedValue={value3}
                onValueChange={(itemValue) => setValue3(itemValue)}
                >
                    <Picker.Item label="salón principal" value="salón principal" />
                    <Picker.Item label="terraza" value="terraza" />
                    <Picker.Item label="barra" value="barra" />
                </Picker>
        </View>

        <Text style={styles.label}>DIETAS:</Text>
        <View>
            <Text> {value4}</Text>
                <Picker
                    selectedValue={value4}
                    onValueChange={(itemValue) => setValue4(itemValue)}
                >
                    <Picker.Item label="vegetariano" value="vegetariano" />
                    <Picker.Item label="vegano" value="vegano" />
                    <Picker.Item label="celiaco" value="celiaco" />
                </Picker>
        </View>
      
        <Text style={styles.label}>EXTRAS:</Text>
        <View>
            <Text> {value5}</Text>
                <Picker
                    selectedValue={value5}
                    onValueChange={(itemValue) => setValue5(itemValue)}
                >
                    <Picker.Item label="bar" value="bar" />
                    <Picker.Item label="familiar" value="familiar" />
                    <Picker.Item label="wi-fi" value="wi-fi" />
                </Picker>
        </View>
        {/* <RepositoryList extras={value5}></RepositoryList> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default SelectComponent;


