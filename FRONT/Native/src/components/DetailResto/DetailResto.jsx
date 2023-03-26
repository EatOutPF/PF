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
    const detail = useSelector(state => state.restorantById)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();
    

    useEffect(() => {
        // console.log("detail 1: ", Object.keys(detail)?.length );

        if(Object.keys(detail)?.length === 0) { 
            // console.log("detail if 1: ",detail );
            dispatch(searchRestorantById(_id));
             }
        else {
            // console.log("soy el detail, ", _id);
            setLoading(false)
            // dispatch(searchRestorantById(_id));
        }
    
    },[detail])

    return(
        <ScrollView>
            
            {loading ?
                <Loading/> :
                <View>
                    <Image style={styles?.image} source={{ uri: detail?.images[0] }}></Image>
                    <Text> {detail?.name.toUpperCase()} - (id:{detail?._id})</Text>
                    <Text> </Text>

                    <Text> ACA VA EL VALOR DE LA RESERVA $$$</Text>
                <Text> ⭐️{detail?.ranking} - 📍{detail?.address[0]?.streetName}, {detail?.address[0]?.streetNumber}</Text>

                    <Text> </Text>
                    <Text> RESERVA</Text>
                    <Text> Cantidad de personas..</Text>
                    <Text> Calendario ...</Text>
                    <Text> </Text>

                    <Text> Sobre Nosotros</Text>
                    <Text style={{paddingLeft: 20}}> Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                        It has survived not only five centuries.</Text>

                    <Text> </Text>
                    <Text> MENU --- Link a la carta</Text>
                    <Text> </Text>

                    <Text> Categorias :</Text>
                    <Text> -- {detail?.menu[0]} {detail?.diets[0]} {detail?.extras[0]} {detail?.extras[1]} {detail?.extras[2]} </Text>
                    <Text> -- {detail?.section[0]} {detail?.section[1]} {detail?.section[2]} {detail?.active} {detail?.diets[1]} {detail?.atmosphere[0]} </Text>
                    <Text> </Text>
                    <Text> HORARIOS</Text>
                    <Text> ---- {detail?.schedule[0]?._id}</Text>
                    <Text> ---- {detail?.schedule[1]?._id}</Text>
                    <Text> ---- {detail?.schedule[2]?._id}</Text>
                    <Text> ---- {detail?.schedule[3]?._id}</Text>
                    <Text> ---- {detail?.schedule[4]?._id}</Text>
                    <Text> ---- {detail?.schedule[5]?._id}</Text>
                    <Text> ---- {detail?.schedule[6]?._id}</Text>
                    <Text> ---- {detail?.schedule[4]?._id}</Text>


                    <Text> </Text>
                    <Text> Metodos de Pago </Text>
                    <Text> -- {detail?.paymentMethods[0]}, {detail?.paymentMethods[1]}, {detail?.paymentMethods[2]}</Text>
                    <Text> </Text>
                    <Text> </Text>



                </View>

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
  }
})

export default DetailResto
