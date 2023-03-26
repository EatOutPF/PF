import React, { useState, useEffect } from 'react'
import { Image, View, StyleSheet, Dimensions, Button, Text } from 'react-native'
import StyledText from '../../styles/StyledText/StyledText.jsx'
import { useParams } from 'react-router-native'
import { useDispatch, useSelector } from 'react-redux'
import { searchRestorantById } from '../../redux/actions.js'

import Loading from "../Loading/Loading"

import theme from '../../styles/theme.js'


const DetailResto = (props) => {
    const { _id } = useParams();
    const detail = useSelector(state => state.restorantById)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();

    

    useEffect(() => {
        if(detail?._id !== _id) { setLoading(false) }
        else {

            dispatch(searchRestorantById(_id));}
    
    },[detail])

    return(
    <View 
        // key={props._id} 
        style={styles.container}
    >
        {loading ? <Loading/> :  
            <Text> Hola que tal {_id} y {detail.name}, {detail.name}</Text>

        }   
            
    </View>
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
//   image: {
//     width: width,
//     height: width,
//     borderRadius: 4
//   }
})

export default DetailResto
