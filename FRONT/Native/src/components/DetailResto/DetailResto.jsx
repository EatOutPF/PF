
import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, ScrollView, Dimensions, Button, Text } from 'react-native'
import StyledText from '../../styles/StyledText/StyledText.jsx'
import { useParams } from 'react-router-native'
import { useDispatch, useSelector } from 'react-redux'
import { searchRestorantById,  } from '../../redux/actions.js'

import Loading from "../Loading/Loading"

import theme from '../../styles/theme.js'


const DetailResto = (props) => {
    const { _id } = useParams();
    const detail = useSelector(state => state?.restorantById)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();
    useEffect(() => {

        if(Object?.keys(detail)?.length === 0) { 

            dispatch(searchRestorantById(_id));
            }
        else {
            setLoading(false)
        }
    
    },[detail])

    return(
        <ScrollView>
            
            {loading ? <Loading/> :
                <View>
                    <Image style={styles?.image} source={{ uri: detail?.images[0] }}></Image>
                    <Text style={styles.superTitle}> {detail?.name?.toUpperCase()} - </Text>
                    {/* <Text> (id:{detail?._id})</Text> */}

                    <Text style={styles.title}> Valor de la reserva:   $ {detail?.advance}</Text>
                    <Text style={styles.textBody}>  ⭐️{detail?.ranking} - 📍{detail?.address?.streetName}, {detail?.address?.streetNumber}</Text>
                    <Text> </Text>

                    <Text style={styles.textBody}> ---- Facebool: {detail?.contact?.socialMedia?.facebook} </Text>
                    <Text style={styles.textBody}> ---- Instagram: {detail?.contact?.socialMedia?.instagram} </Text>


                    <Text> </Text>
                    <Text> RESERVA</Text>
                    <Text style={styles.textBody}> Cantidad de personas..</Text>
                    <Text style={styles.textBody}> Calendario ...</Text>
                    <Text> </Text>

                    <Text style={styles.title}> Sobre Nosotros</Text>
                    <Text style={{paddingLeft: 20}}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries.</Text>

                    <Text> </Text>
                    <Text style={styles.textBody}> MENU --- Link a la carta</Text>
                    <Text> </Text>

                    <Text style={styles.title}> Categorias :</Text>
                    <Text style={styles.textBody}> -- {detail?.menu[0]} {detail?.diets[0]} {detail?.extras[0]} {detail?.extras[1]} {detail?.extras[2]} </Text>
                    <Text style={styles.textBody}> -- {detail?.section[0]} {detail?.section[1]} {detail?.section[2]} {detail?.active} {detail?.diets[1]} {detail?.atmosphere[0]} </Text>
                    <Text> </Text>
                    <Text style={styles.title}> HORARIOS</Text>
                    <Text style={styles.textBody}> ---- Lunes --- {detail?.schedule[0]?.monday?.open}hs a {detail?.schedule[0]?.monday?.close}hs</Text>
                    <Text style={styles.textBody}> ---- Martes --- {detail?.schedule[0]?.tuesday?.open}hs a {detail?.schedule[0]?.tuesday?.close}hs</Text>
                    <Text style={styles.textBody}> ---- Miercoles --- {detail?.schedule[0]?.wednesday?.open}hs a {detail?.schedule[0]?.wednesday?.close}hs</Text>
                    <Text style={styles.textBody}> ---- Jueves --- {detail?.schedule[0]?.thursday?.open}hs a {detail?.schedule[0]?.thursday?.close}hs</Text>
                    <Text style={styles.textBody}> ---- Viernes --- {detail?.schedule[0]?.friday?.open}hs a {detail?.schedule[0]?.friday?.close}hs</Text>
                    <Text style={styles.textBody}> ---- Sabado --- {detail?.schedule[0]?.saturday?.open}hs a {detail?.schedule[0]?.saturday?.close}hs</Text>
                    <Text style={styles.textBody}> ---- Domingo --- {detail?.schedule[0]?.sunday?.open}hs a {detail?.schedule[0]?.sunday?.close}hs</Text>




                    <Text> </Text>
                    <Text style={styles.title}> Metodos de Pago </Text>
                    <Text style={styles.textBody}> -- {detail?.paymentMethods[0]}, {detail?.paymentMethods[1]}, {detail?.paymentMethods[2]}</Text>
                    <Text> </Text>
                    <Text> </Text>



                </View>

                // :<Loading/>

            } 
                
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingVertical: 5,
    // width: "100%",
  },
//   language: {
//     padding: 4,
//     color: theme.colors.white,
//     backgroundColor: theme.colors.primary,
//     alignSelf: 'flex-start',
//     marginVertical: 4,
//     borderRadius: 4,
//     overflow: 'hidden'
//   },
  image: {
    width: 400,
    height: 200,
    borderRadius: 4
  },
  superTitle:{
    fontSize: 30
  },
  title:{
    fontSize: 25,
  },
  textBody: {
    fontSize:20,
  }
})

export default DetailResto
