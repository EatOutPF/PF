
import React, { useState, useEffect, useRef } from 'react'
import { Image, View, StyleSheet, ScrollView, Text, TouchableOpacity, Modal } from 'react-native'
import StyledText from '../../styles/StyledText/StyledText.jsx'
import { useParams } from 'react-router-native'
import { useDispatch, useSelector } from 'react-redux'
import { searchRestorantById, clearStateResatorantById } from '../../redux/actions.js'
import { useNavigation } from '@react-navigation/native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';

import Loading from "../Loading/Loading"
import theme from '../../styles/theme.js'
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español


const DetailResto = ({ route }) => {
  // const { _id } = useParams();
  const { _id } = route.params;
  const detail = useSelector(state => state?.restorantById)
  const [loading, setLoading] = useState(true)
  console.log("SOY DETAIL: ", _id);
  const dispatch = useDispatch();

  // Cuantas personas?
  const [contador, setContador] = useState(2)

  //Que dia?
  const [showModal, setShowModal] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const dateToString = moment(currentDate).locale('es').format('ddd, D [de] MMM');
  const [showDate, setShowDate] = useState(dateToString)

  const handleDate = (date) => {
    const newDate = moment(date).locale('es').format('ddd, D [de] MMM');
    setShowDate(newDate)
  }

  //A que hora ? -Horarios
  const horarios = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
  ]

  //Menú, Categorias, Horarios, Medios de Pago, reviews
  const scrollViewRef = useRef();
  const handlePress = () => {
    scrollViewRef.current.scrollTo({ y: 500, animated: true });
  };


  useEffect(() => {
    if (Object?.keys(detail)?.length === 0) {
      dispatch(searchRestorantById(_id));
    }
    else
      if (Object?.keys(detail)?.length !== 0) {
        if (detail?._id !== _id) {
          // dispatch(clearStateResatorantById())
          dispatch(searchRestorantById(_id));
          setLoading(true)

        }
        else setLoading(false)
      }

  }, [detail, loading])

  const navigation = useNavigation();
  function handleCheckOut() {
    console.log("QUIERO IR A MERCADOPAGO");
    const checkout = {
      resto: detail,
      reserve: {
        userId: "aaaaa", // Chequear el stado global del usuario logeado
        cantPersons: 2,
        cantTables: 1, // pasar la cantidad de mesas reservadas (cant de personas/2 - redondear para arriba)
        schedule: "schedule", // la fecha y hora de la reserva
      }
    }
    navigation.navigate("Checkout", checkout)
  }

  return (
    <ScrollView>

      {loading ? <Loading /> :
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


              {/* ----------------------Cuantas personas ----------------------*/}
              <View style={styles.containerPersons}>
                <IonicIcon
                  name="people-outline"
                  size={50}
                  margin={10}

                />

                <View style={styles.reservDetail}>
                  <Text style={styles.textReserv2}>¿CUÁNTAS PERSONAS?</Text>
                  <Text style={styles.textReservDetail}> {contador} personas</Text>
                </View>

                <View style={styles.containerButtonsPerson}>

                  <TouchableOpacity>
                    <IonicIcon
                      style={styles.buttonPersons}
                      name="remove-circle-outline"
                      size={37}
                      onPress={() => {
                        if (contador === 2) {
                          setContador(2)
                        } else {
                          setContador(contador - 1)
                        }
                      }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <IonicIcon
                      style={styles.buttonPersons}
                      name="add-circle-outline"
                      size={37}
                      onPress={() => {
                        if (contador === 30) {
                          setContador(30)
                        } else {
                          setContador(contador + 1)
                        }
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>



              {/* ------------------------¿Que dia ?------------------------ */}

              <View style={styles.containerPersons}>
                <IonicIcon
                  name="calendar-outline"
                  size={45}
                  margin={15}
                />

                <View style={styles.reservDetail}>
                  <Text style={styles.textReserv2}>¿QUÉ DÍA?</Text>
                  <Text style={styles.textReservDetail}>{showDate}</Text>
                </View>

                <View style={styles.containerButtonsPerson}>


                  <TouchableOpacity>
                    <IonicIcon
                      style={{ marginLeft: 70, }}
                      name="chevron-down-circle-outline"
                      size={37}
                      onPress={() => setShowModal(true)}
                    />
                  </TouchableOpacity>
                  <Modal visible={showModal} animationType='fade'>
                    <Calendar
                      // style=
                      onDayPress={date => {
                        setShowModal(false)
                        handleDate(date)
                      }}
                      initialDate={formattedDate}
                      // maxDate=''
                      markedDates={{
                        formattedDate: { marked: true },
                      }}

                    />
                  </Modal>
                </View>
              </View>

              {/*----------------- Qué horario?------------------------ */}
              <View style={styles.containerPersons}>
                <IonicIcon
                  name="time-outline"
                  size={50}
                  margin={10}
                />
                <View style={styles.reservDetail}>
                  <Text style={styles.textReserv2}>¿QUÉ HORARIO?</Text>
                  <Text>9:30 hs</Text>
                </View>
                <View style={styles.buttonPersons}>
                  <TouchableOpacity>
                    <IonicIcon
                      style={{ marginLeft: 70, }}
                      name="chevron-down-circle-outline"
                      size={37}

                    // onPress={() => setPickerVisible(true)} 
                    />
                  </TouchableOpacity>

                </View>


              </View>

              {/* Boton 'CONFIRMAR RESERVA' */}
              <TouchableOpacity style={styles.confirmButton}
                onPress={() => handleCheckOut()}>
                <IonicIcon
                  name="checkmark-outline"
                  size={20}
                  color={'white'}

                />
                {/* {showWebview && (
                            <WebView
                              source={{ uri: 'https://google.com' }}
                              style={{ flex: 1 }}
                            />
                          )} */}
                <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}>Confimar Reserva</Text>
              </TouchableOpacity>



            </View>
            {/* ---------- Scroll Horizontal ------------ */}


            <View style={{ margin: 8, }}>
              <ScrollView
                horizontal={true}
                ref={scrollViewRef}>


                <TouchableOpacity
                  style={styles.buttonHorizontalScroll}
                  onPress={handlePress}>
                  <Text style={styles.textButtonHorizontalScroll}>INFORMACIÓN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonHorizontalScroll}>
                  <Text style={styles.textButtonHorizontalScroll}>MENÚ</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonHorizontalScroll}>
                  <Text style={styles.textButtonHorizontalScroll}>CATEGRORÍAS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonHorizontalScroll}>
                  <Text style={styles.textButtonHorizontalScroll}>HORARIOS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonHorizontalScroll}>
                  <Text style={styles.textButtonHorizontalScroll}>SOBRE NOSOTROS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonHorizontalScroll}>
                  <Text style={styles.textButtonHorizontalScroll}>MEDIOS DE PAGO</Text>
                </TouchableOpacity>

              </ScrollView>
            </View>

            {/*------------------ Sobre Nosotros------------------- */}
            <View style={styles.containerTitle}>
              <Text style={styles.title}> Sobre Nosotros</Text>
            </View>
            <View style={styles.textAbout}>
              <Text style={styles.textReserv2}> {detail?.about} </Text>
            </View>


            {/* ---------------- menu --> link a la carta del resto ----- */}
            <View style={styles.containerTitle}>
              <Text style={styles.title}> MENU --- Link a la carta</Text>
            </View>

            {/*-------------- categorias ------------------------------ */}

            <View style={styles.containerTitle}>
              <Text style={styles.title}> Categorías</Text>
            </View>

            <View style={styles.containerTypesCategories}>
              <IonicIcon name="fast-food-outline" style={styles.iconCategories} />
              <Text style={styles.textCategories}>Tipo de comida: </Text>
              <Text style={styles.aboutCategories}>{detail?.menu[0]}</Text>
            </View>

                        
            <View style={styles.containerTypesCategories}>
              <IonicIcon name="beer-outline" style={styles.iconCategories} />
              <Text style={styles.textCategories}>Ambiente: </Text>
              <Text style={styles.aboutCategories}>{detail?.atmosphere[0]}</Text>
            </View>

            <View style={styles.containerTypesCategories}>
              <IonicIcon name="partly-sunny-outline" style={styles.iconCategories} />
              <Text style={styles.textCategories}>Espacios: </Text>
              <Text style={styles.aboutCategories}>{detail?.section[0]}</Text>
            </View>

            <View style={styles.containerTypesCategories}>
              <IonicIcon name="leaf-outline" style={styles.iconCategories} />
              <Text style={styles.textCategories}>Cuenta con: </Text>
              <Text style={styles.aboutCategories}>{detail?.section[0]}</Text>
            </View>

            <Text>
              {" "}
              --  {detail?.diets[0]} {detail?.extras[0]}{" "}
              {detail?.extras[1]} {detail?.extras[2]}{" "}
            </Text>
            <Text >
              {" "}
              --  {detail?.section[1]} {detail?.section[2]}{" "}
              {detail?.active} {detail?.diets[1]} {" "}
            </Text>


            {/* <Text style={{ paddingLeft: 20 }}>

                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries.
                      </Text> */}

          </View>

          <View>
            <Text style={styles.title}> Categorias :</Text>

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
        </View>

        // :<Loading/>

      }

    </ScrollView>
  );
}

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
    height: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
    margin: 0,
    borderRadius: 20,
    borderWidth: 0.2,
    borderColor: 'black',
    borderStyle: 'dotted',
  },
  containerPersons: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EBE9E9',
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
    marginTop: 15,
    marginLeft: 12,

  },
  buttonPersons: {
    alignSelf: 'center',
    margin: 8,
    // backgroundColor: 'orange',
  },

  textReserv2: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 20,
    // backgroundColor: 'yellow',


  },
  reservDetail: {
    // backgroundColor: 'green',
    alignItems: 'center',
    alignSelf: 'center',
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
    fontFamily: "Inria-Sans-Bold",
    fontSize: 25,


  },
  textBody: {
    fontFamily: "Inria-Sans-Regular",
    fontSize: 20,
    marginTop: 5,
    justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    height: 40,
    width: 160,
    marginTop: 5,

    elevation: 5,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowRadius: 10,

  },

  //----------- botones del scroll horizontal--------
  buttonHorizontalScroll: {
    backgroundColor: '#FA6B6B',
    margin: 10,
    borderRadius: 10,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowOffset: { width: 3, height: 3 },
  },
  textButtonHorizontalScroll: {
    fontFamily: 'Inria-Sans-Bold',
    fontWeight: 'bold',
    fontSize: 15,
  },
  //----------Titulos e informacion---------------------
  containerTitle: {
    margin: 10,
  },
  textAbout: {

  },
  //----------Categorias-----------------
  containerTypesCategories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCategories: {
    fontSize: 25,
    // color: 'grey',
    margin: 10,
  },
  textCategories: {
    fontFamily: 'Inria-Sans-Italic',
    fontSize: 18,
  },
  aboutCategories: {
    fontFamily: 'Inria-Sans-Light',
    fontSize: 18,
    marginLeft: 10,
  }
});
export default DetailResto
