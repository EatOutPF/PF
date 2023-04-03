import React, { useState, useEffect } from "react";
import { Image, View, StyleSheet, ScrollView, Text, TouchableOpacity, } from "react-native";
import { Picker } from '@react-native-picker/picker'
// import { ImageFilter } from 'react-native-image-filter-kit'; //Libreria para aplicar filtros a las imagenes

import { useParams } from "react-router-native";
import { useDispatch, useSelector } from "react-redux";
import { searchRestorantById } from "../../redux/actions.js";
import Loading from "../Loading/Loading";
import IonicIcon from 'react-native-vector-icons/Ionicons';




const DetailResto = (props) => {
  const { _id } = useParams();
  const detail = useSelector((state) => state.restorantById);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      await dispatch(searchRestorantById(_id)); // no sacar el await por tema de asincronismo
      setLoading(false);
    }
    fetchData();
  }, [_id, dispatch]);


  const [pickerVisible, setPickerVisible] = useState(false);
  // const [selectedValue, setSelectedValue] = useState("valorPorDefecto");  //esto es solo un ejemplo para picker, luego debe ser reemplazado por el estado que trae los dias disponibles para hacer la reserva


  return (

    <View style={styles.container}>
      <ScrollView>


        {loading ? (
          <Loading />
        ) : (
          detail &&
          <View>
            <Image style={styles?.image} source={{ uri: detail?.images[0] }} />

            <View style={styles.titleContainer}>
              <Text style={styles.superTitle}>{detail?.name}</Text>
            </View>

            <Text style={styles.text1}>Restaurant - Valor de la reserva: $ {detail?.advance}</Text>

            <View style={styles.container2}>
              <View style={styles.iconText}>
                <IonicIcon
                  name="star-outline"
                  size={20} />
                <Text style={styles.text1}>{detail?.ranking}</Text>
              </View>
              <View style={styles.iconText}>
                <IonicIcon
                  name="pin-outline"
                  size={20}
                />
                <Text style={styles.text1}>{detail?.address?.streetName}</Text>
              </View>
            </View>

            <View style={styles.containerReserva}>
              <Text style={styles.subTitle}> Hacé tu reserva</Text>

              <View style={styles.containerPerCalHor}>


                <View style={styles.containerPersons}>
                  <IonicIcon
                    name="people-outline"
                    size={50}
                    margin={10}

                  />

                {/* Cuantas personas ----------------------*/}
                  <View style={styles.reservDetail}>
                    <Text style={styles.textReserv2}>¿CUÁNTAS PERSONAS?</Text>
                    <Text style={styles.textReservDetail}>2 personas</Text>
                  </View>

                  <View style={styles.containerButtonsPerson}>

                    <View style={styles.containerButton}>
                      <IonicIcon
                        style={styles.buttonPersons}
                        name="remove-circle-outline"
                        size={37}
                      // onPress
                      />
                    </View>
                    <View style={styles.containerButton}>
                      <IonicIcon
                        style={styles.buttonPersons}
                        name="add-circle-outline"
                        size={37}
                      // onPress
                      />
                    </View>

                  </View>

                </View>

                <View style={styles.containerPersons}>
                  <IonicIcon
                    name="calendar-outline"
                    size={45}
                    margin={10}

                  />


                {/* Que dia ?------------------------ */}
                  <View style={styles.reservDetail}>
                    <Text style={styles.textReserv2}>¿QUÉ DÍA?</Text>
                    <Text style={styles.textReservDetail}>Dom, 2 de Abr -Hoy-</Text>
                  </View>

                  <View style={styles.containerButtonsPerson}>

                  
                  {/* En esta parte deberia tener un picker que me de las opciones disponibles de los dias en que puedo realizar una reserva */}
                    <View style={styles.containerButton}>    
                    <IonicIcon 
                    name="chevron-down-circle-outline" 
                    size={37}
                    onPress={() => setPickerVisible(true)} />

                    </View>

                  </View>

          






                </View>


              </View>
            </View>


            <Text style={styles.textBody}> Calendario ...</Text>
            <Text style={styles.title}> Sobre Nosotros</Text>
            <Text style={{ paddingLeft: 20 }}>
              {" "}
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book. It has survived not
              only five centuries.
            </Text>
            <Text style={styles.textBody}> MENU --- Link a la carta</Text>
            <Text style={styles.title}> Categorias :</Text>
            <Text style={styles.textBody}>
              {" "}
              -- {detail?.menu[0]} {detail?.diets[0]} {detail?.extras[0]}{" "}
              {detail?.extras[1]} {detail?.extras[2]}{" "}
            </Text>
            <Text style={styles.textBody}>
              {" "}
              -- {detail?.section[0]} {detail?.section[1]} {detail?.section[2]}{" "}
              {detail?.active} {detail?.diets[1]} {detail?.atmosphere[0]}{" "}
            </Text>
            <Text style={styles.title}> HORARIOS</Text>
            <Text style={styles.textBody}>
              {" "}
              ---- Lunes --- {detail?.schedule[0]?.monday?.open}hs a{" "}
              {detail?.schedule[0]?.monday?.close}hs
            </Text>
            <Text style={styles.textBody}>
              {" "}
              ---- Martes --- {detail?.schedule[0]?.tuesday?.open}hs a{" "}
              {detail?.schedule[0]?.tuesday?.close}hs
            </Text>
            <Text style={styles.textBody}>
              {" "}
              ---- Miercoles --- {detail?.schedule[0]?.wednesday?.open}hs a{" "}
              {detail?.schedule[0]?.wednesday?.close}hs
            </Text>
            <Text style={styles.textBody}>
              {" "}
              ---- Jueves --- {detail?.schedule[0]?.thursday?.open}hs a{" "}
              {detail?.schedule[0]?.thursday?.close}hs
            </Text>
            <Text style={styles.textBody}>
              {" "}
              ---- Viernes --- {detail?.schedule[0]?.friday?.open}hs a{" "}
              {detail?.schedule[0]?.friday?.close}hs
            </Text>
            <Text style={styles.textBody}>
              {" "}
              ---- Sabado --- {detail?.schedule[0]?.saturday?.open}hs a{" "}
              {detail?.schedule[0]?.saturday?.close}hs
            </Text>
            <Text style={styles.textBody}>
              {" "}
              ---- Domingo --- {detail?.schedule[0]?.sunday?.open}hs a{" "}
              {detail?.schedule[0]?.sunday?.close}hs
            </Text>
            <Text style={styles.title}> Metodos de Pago </Text>
            <Text style={styles.textBody}>
              {" "}
              -- {detail?.paymentMethods[0]}, {detail?.paymentMethods[1]},{" "}
              {detail?.paymentMethods[2]}
            </Text>
          </View>
        )
        }

      </ScrollView >

    </View >

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleContainer: {
    // backgroundColor: 'grey',


  },
  superTitle: {
    fontFamily: "Inria-Sans-Bold",
    fontSize: 35,
  },
  containerReservValue: {
    // padding: 3,
    // backgroundColor: 'red',
  },
  text1: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 20,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    // backgroundColor: 'blue',
    margin: 0,
  },
  iconText: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginLeft: 20,
  },
  subTitle: {
    fontFamily: "Inria-Sans-Bold",
    fontSize: 25,
  },

  containerReserva: {
    // backgroundColor: 'orange',
  },
  containerPerCalHor: {
    // backgroundColor: 'blue',
    width: '100%',
    height: '50%',
    alignItems: 'center',
    padding: 10,
    // backgroundColor: 'red',
  },
  containerPersons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#D9D9D9',
    width: '99%',
    height: '22%',
    borderRadius: 20,
    margin: 5,

    elevation: 5, // sombreado en Android
    shadowOffset: { width: 2, height: 2 }, // sombreado en iOS
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  containerButtonsPerson: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  containerButton: {
    backgroundColor: '#FA6B6B',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    margin: 10,


    elevation: 5, // sombreado en Android
    shadowOffset: { width: 2, height: 2 }, // sombreado en iOS
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  buttonPersons: {
    alignSelf: 'center',
    marginLeft: 1,
  },


  textReserv2: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 20,
    // backgroundColor: 'yellow',
    marginLeft: 2,
    marginTop: 10,

  },
  reservDetail: {
    // backgroundColor: 'green',
    alignItems: 'center',
  },
  textReservDetail: {
    fontFamily: 'Inria-Sans-Bold',
    fontSize: 20,
    marginLeft: 5,
    marginTop: 5,
  },

  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  tinyLetter: {
    fontFamily: "Inria-Sans-Light",
    fontSize: 20,
  },
  title: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 25,
  },
  textBody: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 20,
    marginTop: 5,
    justifyContent: 'center',
  },
});

//Falta: a qué distancia me encuentro para llegar al restaurant.

export default DetailResto;
