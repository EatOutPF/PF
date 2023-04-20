
import React, { useState, useEffect, useRef } from 'react'
import { Image, View, StyleSheet, ScrollView, Text, TouchableOpacity, Modal, Animated, SafeAreaView } from 'react-native'
import StyledText from '../../styles/StyledText/StyledText.jsx'
import { useParams } from 'react-router-native'
import { useDispatch, useSelector } from 'react-redux'

import {  PostsFavorite, PostsOptions } from '../../redux/actions.js'
import { searchRestorantById, clearStateResatorantById, clearLinkMercadoPago, postListReviews } from '../../redux/actions.js'

import { useNavigation } from '@react-navigation/native';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import {auth} from "../../../firebase-config.js"
import Loading from "../Loading/Loading"
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import 'moment/locale/es'; // Importa el idioma español

import { Icon } from 'react-native-elements'
import { removeFavorite } from '../../redux/actions.js'

import 'moment-timezone';

import RBSheet from "react-native-raw-bottom-sheet";
import ListReviews from '../Reviews/ListReviews.jsx'



const DetailResto = ({ route }) => {
  const resto = useSelector(state => state?.restorantsFound)
  const { _id } = route.params;
  const detail = useSelector(state => state?.restorantById)
  const [isFavorite ,setIsFavorite ]= useState(false)
  const [userLogged, setuserLogged]= useState(false)
  const userData = useSelector(state=>state?.userInfo)
  
  const [userId, setUserId] = useState(null);



  useEffect(() => {
    auth.onAuthStateChanged(user => {
      user ? setuserLogged(true) : setuserLogged(false);
      setUserId(user.uid);
      console.log(`ID del usuario: ${user.uid}`);
    });
  }, []);

  console.log("SOY DETAIL: ", _id);
  const user = useSelector(state => state?.userInfo)
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch();

  // --------Cuantas personas?--------
  const [contador, setContador] = useState(2)

  //--------------Que dia?---------------
  const [calendarioVisible, setCalendarioVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().split('T')[0];
  const dateToString = moment(currentDate).locale('es').format('ddd, D [de] MMM');
  const [showDate, setShowDate] = useState('Elige el día')
  const [isSelected, setIsSelected] = useState(true);
  // ------------reserva-----------
  const [reserve, setReserve] = useState({
    user: null,
    date: "2023-04-18",
    time: "17:30",
    table: 1,
  })
  const handlePersons = (persons) => {
    const operation = Math.ceil(persons / 2);
    setReserve({ ...reserve, table: operation });
  }
  useEffect(() => {
    // Comprobar si el restaurante ya está en favoritos
    console.log(userData)
    if (userData && userData?.favorite?.[0]?.restaurant[0]?._id === _id) {
      setIsFavorite(true);
    }
  }, [userData]);

  //-----Que dia?---------------
  const expandir = () => {
    setCalendarioVisible(false);
  }
  //----------------------------------------------------- 
  useEffect(() => {
    dispatch(clearLinkMercadoPago());
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


  //--------------A que hora ? -Horarios-----------------
  const [hours, setHours] = useState([]);
  const [showHours, setShowHours] = useState('Elegir horario');


  const generateHorarios = (openTime, closeTime) => { //genero horarios cada 30 min
    const horarios = [];
    let current = new Date(openTime);
    while (current <= closeTime) {
      const time = moment(current).format('HH:mm')
      horarios.push(time);
      current.setMinutes(current.getMinutes() + 30);
    }
    return horarios;
  }
  // const today = new Date(`${year}-${month + 1}-${day}`).toLocaleString('en-US', { weekday: 'long' }).toLowerCase().split(',')[0];


  
  const handleDate = (date) => {
    console.log(date)
    //Obtengo el año, mes y día
    const selectedDate = new Date(date.dateString);
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth() + 1;
    const year = selectedDate.getFullYear();

    //la siguiente linea guarda el nombre del dia selcccionado en inglés    
    const today = new Date(`${year}-${month + 1}-${day}`).toLocaleString('en-US', { weekday: 'long' }).toLowerCase().split(',')[0];
    const restoHorarios = detail?.schedule; //horarios semanales del restaurant
    const result = restoHorarios[today]; // Esto selcciona el dia del restaurante dentro del restaurante
    const openTime = new Date(`${year}-${month}-${day}T${result.open}`); // Este es el horario de apertura del restaurante
    const closeTime = new Date(`${year}-${month}-${day}T${result.close}`); // Este es el horario de cierre del restaurante
    const horarios = generateHorarios(openTime, closeTime);
    //  convierte la fecha en un texto en español y setea la fecha de la reserva
    // const newDate = moment(date).locale('es').format('ddd, D [de] MMM');
    const newDate = moment.tz(new Date(date.year, date.month - 1, date.day), "America/Argentina/Buenos_Aires").locale('es').format('dddd, D [de] MMMM');
    setShowDate(newDate)
    // setReserve({ ...reserve, date: date.dateString });
    setHours(horarios)
    setIsSelected(false)
  }
  //----------------------------------------------------------------------------
  const bottomSheetRef = useRef();
  const minDate = new Date()

  const openBottomSheet = () => {
    bottomSheetRef.current.open();
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current.close();
  };

  const handleHorario = (item) => {
    setReserve({ ...reserve, time: item });
    setShowHours(item)
  }

  const handleReserva = (date, item) => {
    if (!date || !item) {
      // console.log('DATE', date, 'HORA', item)
      alert('Por favor asegurese de  seleccionar una fecha y un horario antes de realizar la reserva')
    } else {
      dispatch(handleCheckOut(reserve))
      setReserve({ ...reserve, date: date.dateString });
    }
  }

  //Menú, Categorias, Horarios, Medios de Pago, reviews
  //----------------------------------Header------------------------------
  const [headerHeight, setHeaderHeight] = useState(new Animated.Value(300));
  const scrollViewRef = useRef();
  const handlePress = () => {
    scrollViewRef.current.scrollTo({ y: 500, animated: true });
  };

  const navigation = useNavigation();
  function handleCheckOut() {
    const checkout = {
      resto: detail,
      user: user,
      reserve: {
        cantPersons: contador,
        date: reserve.date,
        time: reserve.time,
        table: reserve.table,
      }
    }
    navigation.navigate("Checkout", { checkout: checkout })
  }
//-----------------AQUI ESTA LA FUNCION PARA AGREGAR A FAVORITOS---------------------//
  const handleAddFavorite = () => {
    if (!userLogged) {
      alert('Para agregar el restaurante debes estar logeado');
      return;
    }
     
    dispatch(PostsFavorite(restaurant, user));
    dispatch(searchRestorantById(_id));
    alert('Restaurante agregado a favoritos');
    console.log(`Enviando restauran: ${restaurant}, user ${user}`);

  };
const handleRemoveFavorite = () => {
  if (!userLogged) {
    return;
  }
  const restaurant = detail._id;
  const user = userId; 
  dispatch(PostsFavorite(restaurant, user));
  dispatch(searchRestorantById(_id));
  alert('eliminado');
  console.log(`Enviando restauran: ${restaurant}, user ${user}`);
  };
  

  function handleResenias() {
    navigation.navigate("Ranking-Reseñas", { resto: detail })
  }

  function handleReviews() {
    navigation.navigate("Reviews-Resto", { resto: detail })
  }


  return (
    <View style={styles.container}>
      <ScrollView>
        {loading ? (
          <Loading />
        ) : (
          detail &&
          <View>
            <Image style={styles?.image} source={{ uri: detail?.images[0] }} /> 
            {/*ESTE VIEW ES DONDE ESTA EL CORAZON */}
          <View style={styles.viewFavortires}>
          <Icon 
            type= "material-community"
            name= {isFavorite ? "heart-outline" : "heart"}
            onPress={isFavorite ? handleAddFavorite : handleRemoveFavorite }
            color= { '#FF0000'}
            size= {35}
            underlayColor="tranparent">

         </Icon>
           
       </View>
            <View style={styles.titleContainer}>
              <Text style={styles.superTitle}>{detail?.name}</Text>
            </View>


            <View>
              <Text style={styles.text1}>Restaurant - Valor de la reserva: $ {detail?.advance}</Text>
            </View>

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


            {/* --------------------------------------------------------------- */}

            <View style={styles.containerReserva}>
              <Text style={styles.subTitle}> Hacé tu reserva</Text>
            </View>

            <View style={styles.containerConfigReserva}>

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
                          handlePersons(contador)
                        } else {
                          setContador(contador - 1)
                          handlePersons(contador)
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
                          handlePersons(contador)
                        } else {
                          setContador(contador + 1)
                          handlePersons(contador)
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
                      minDate={minDate}
                      onDayPress={date => {
                        handleDate(date)
                        setShowModal(false)
                        setIsSelected(false)
                      }}
                      initialDate={formattedDate}
                      markedDates={{ [isSelected]: {
                        selected: true,
                        disableTouchEvent: true,
                        selectedDotColor: 'orange',
                      },
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
                  <Text style={styles.textReservDetail}>{showHours}</Text>
                </View>

                <View style={styles.buttonPersons}>
                  <TouchableOpacity
                    onPress={openBottomSheet}
                    disabled={isSelected}>
                    <IonicIcon
                      style={{ marginLeft: 70, color: isSelected ? 'grey' : 'black' }}
                      name="chevron-down-circle-outline"
                      size={37} />
                    <RBSheet
                      ref={bottomSheetRef}
                      closeOnDragDown={true}
                      closeOnPressMask={true}
                      customStyles={{
                        wrapper: {
                          backgroundColor: "transparent"
                        },
                        draggableIcon: {
                          backgroundColor: "#000"
                        }
                      }}>
                      <View style={styles.containerHorarios}>
                        <ScrollView>
                          {hours?.map((item) => (
                            <TouchableOpacity
                              onPress={() => {
                                handleHorario(item);
                                closeBottomSheet();
                              }}>
                              <View style={styles.horariosButtons}>
                                <Text
                                  style={styles.hora}
                                  key={item}>{item}
                                </Text>
                              </View>
                            </TouchableOpacity>

                          ))}
                        </ScrollView>
                      </View>
                    </RBSheet>
                  </TouchableOpacity>
                </View>
              </View>

              {/* --------------Boton 'CONFIRMAR RESERVA'------------------------ */}
              <View>
                <TouchableOpacity
                  style={[styles.confirmButton, (reserve.date || reserve.time) ? null : styles.disabledConfirmButton]}
                  disabled={!reserve.date && !reserve.time}
                  onPress={() => {
                    handleReserva()
                    handleCheckOut()
                  }}>
                  <IonicIcon
                    name="checkmark-outline"
                    size={20}
                    color={'white'} />
                  <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}>Confimar Reserva</Text>
                </TouchableOpacity>
                {/* --------------Boton 'REVIEWS'------------------------ */}
                <TouchableOpacity style={styles.confirmButton}
                  onPress={() => handleResenias()}>
                  <IonicIcon
                    name="checkmark-outline"
                    size={20}
                    color={'white'}
                  />


                  <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}>Resenias</Text>
                </TouchableOpacity>



                <TouchableOpacity style={styles.confirmButton}
                  onPress={() => handleReviews()}>
                  <IonicIcon
                    name="checkmark-outline"
                    size={20}
                    color={'white'}
                  />


                  <Text style={{ fontFamily: "Inria-Sans-Bold", fontSize: 15, color: 'white' }}>Ver Opiniones</Text>

                </TouchableOpacity>

              </View>
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
              <Text style={styles.title}> Menú</Text>
              <Text style={{ color: 'blue', fontSize: 18, textDecorationLine: 'underline' }}>link a la carta</Text>
            </View>

            {/*-------------- categorias ------------------------------ */}

            <View style={styles.containerTitle}>
              <Text style={styles.title}> Categorías</Text>
            </View>

            <View>

              <View style={styles.containerTypesCategories}>
                <IonicIcon name="fast-food-outline" style={styles.iconCategories} />
                <Text style={styles.textCategories}>Tipo de comida: </Text>
                {detail?.menu.map((el, index) => (
                  <Text style={styles.aboutCategories} key={index}>{el} -</Text>
                ))}
              </View>


              <View style={styles.containerTypesCategories}>
                <IonicIcon name="beer-outline" style={styles.iconCategories} />
                <Text style={styles.textCategories}>Ambiente: </Text>
                {detail?.atmosphere.map((el, index) => (
                  <Text style={styles.aboutCategories} key={index}>{el} -</Text>
                ))}
              </View>

              <View style={styles.containerTypesCategories}>
                <IonicIcon name="partly-sunny-outline" style={styles.iconCategories} />
                <Text style={styles.textCategories}>Espacios: </Text>
                {detail?.section.map((el, index) => (
                  <Text style={styles.aboutCategories} key={index}>{el} -</Text>
                ))}
              </View>

              <View style={styles.containerTypesCategories}>
                <IonicIcon name="leaf-outline" style={styles.iconCategories} />
                <Text style={styles.textCategories}>Cuenta con: </Text>
                {detail?.diets.map((el, index) => (
                  <Text style={styles.aboutCategories} key={index}>{el} -</Text>
                ))}
              </View>

              <View style={styles.containerTypesCategories}>
                <IonicIcon name="paw-outline" style={styles.iconCategories} />
                <Text style={styles.textCategories}>Otros: </Text>
                {detail?.extras.map((el, index) => (
                  <Text style={styles.aboutCategories} key={index}>{el} -</Text>
                ))}
              </View>

            </View>

            {/*-------------------- Horarios -------------- */}
            <View style={styles.containerCategoriasHorarios}>
              <View style={styles.containerTitle}>
                <Text style={styles.title}>Horarios</Text>
                <Text style={{ fontFamily: 'Inria-Sans-Regular', fontWeight: 'bold', fontSize: 15 }}>
                  Horarios de apertura y cierre</Text>
              </View>

              <View>
                <Text style={styles.aboutCategories}>
                  ---- Lunes --- {detail?.schedule?.monday?.open}hs a{" "}
                  {detail?.schedule?.monday?.close}hs
                </Text>

                <Text style={styles.aboutCategories}>
                  ---- Martes --- {detail?.schedule?.tuesday?.open}hs a{" "}
                  {detail?.schedule?.tuesday?.close}hs
                </Text>
                <Text style={styles.aboutCategories}>
                  ---- Miercoles --- {detail?.schedule?.wednesday?.open}hs a{" "}
                  {detail?.schedule?.wednesday?.close}hs
                </Text>
                <Text style={styles.aboutCategories}>
                  ---- Jueves --- {detail?.schedule?.thursday?.open}hs a{" "}
                  {detail?.schedule?.thursday?.close}hs
                </Text>
                <Text style={styles.aboutCategories}>
                  ---- Viernes --- {detail?.schedule?.friday?.open}hs a{" "}
                  {detail?.schedule?.friday?.close}hs
                </Text>
                <Text style={styles.aboutCategories}>
                  ---- Sabado --- {detail?.schedule?.saturday?.open}hs a{" "}
                  {detail?.schedule?.saturday?.close}hs
                </Text>
                <Text style={styles.aboutCategories}>
                  ---- Domingo --- {detail?.schedule?.sunday?.open}hs a{" "}
                  {detail?.schedule?.sunday?.close}hs
                </Text>
              </View>
            </View>

            {/*--------------- sobre nosotros -------------------- */}
            <View style={styles.containerTitle}>
              <Text style={styles.title}>Sobre Nosotros</Text>
            </View>

            {/* ------------Medios de pago ------------- */}
            <View style={styles.containerTitle}>
              <Text style={styles.title}> Metodos de Pago </Text>
            </View>

            <View>
              <Text>
                {detail?.paymentMethods[0]}, {detail?.paymentMethods[1]},{" "}
                {detail?.paymentMethods[2]}
              </Text>
            </View>
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
    // marginBottom: 10,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  titleContainer: {
    // backgroundColor: 'grey',
  },
  viewFavortires: {
    position:"absolute",
    top: 0,
    right:0,
    backgroundColor:"#fff",
    borderBottomLeftRadius:100,
    padding:5,
    paddingLeft:15,
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
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    // backgroundColor: 'orange',
  },
  containerConfigReserva: {
    // backgroundColor: 'blue',
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 2,
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
  confirmButton: {
    flexDirection: 'row',
    backgroundColor: '#ff5b4f',
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
  disabledConfirmButton: {
    backgroundColor: 'grey'
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
  },
  //Horarios

  horarioModal: {
    width: '50%',
    height: '80%',
    backgroundColor: 'red',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  BTsheet: {
    borderRadius: 10,
  },
  containerCategoriasHorarios: {
    alignItems: 'flex-start',
  },
  containerHorarios: {
    alignItems: 'center',
  },
  horariosButtons: {
    height: 26,
    width: 50,
    alignItems: 'center',

  },
  hora: {
    fontSize: 20,

  }

});
export default DetailResto
