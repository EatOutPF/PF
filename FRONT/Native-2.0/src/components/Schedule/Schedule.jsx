
import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Image, Dimensions } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IonicIcon from 'react-native-vector-icons/Ionicons';
import CapitalizeString from '../CapitalizeString/CapitalizeString'
import RenderSchedule from './RenderSchedule';


const Schedule = () => {
    const [userLog, setUserLog] = useState(false);
    const userData = useSelector(state=>state?.userInfo)
  const { width } = Dimensions.get('window');
  const { height } = Dimensions.get('window');

 
    const renderItem = ({ item }) => (
      <RenderSchedule item={item} />
    );
    useEffect(()=>{
      // console.log("USER LOG", userLog);

      // if (Object?.keys(userData)?.length === 0) {
      //   dataNotificationsReversed=[]
      //   setUserLog(false)
      // }
      // else if(userLog || Object?.keys(userData)?.length !== 0) { 
      //   dataNotificationsReversed = [...userData?.reserve]?.reverse(); }
      // else{
      //   console.log("SOY defined ");
       
      //   setUserLog(true)
      // }
      // else
      //   if (Object?.keys(detail)?.length !== 0) {
      //     if (detail?._id !== _id) {
      //       // dispatch(clearStateResatorantById())
      //       dispatch(searchRestorantById(_id));
      //       setLoading(true)
      //     }
      //     else setLoading(false)
      //   }
    },[userData])

    useEffect(() => {

      userData?.login ? setUserLog(true) : setUserLog(false)
      
    }, [userData])

  return (
    <View style={{ backgroundColor: "#efe4dc"}}>
      {!userLog ? 
      <Image source={require('../../img/no-reserves-no-user.jpg')} style={{ width: width }}  resizeMode="contain"/> : 
        (userData?.reserve?.length === 0 ? 
          <Image source={require('../../img/no-reserves.jpg')} style={{ width: width }}  resizeMode="contain"/> 
          :
        <View>
        <Text style={styles.notificationSubtitle}> 
          {CapitalizeString( userData?.name)} estas son tus RESERVAS :
        </Text>

        <FlatList
          style={{marginBottom: 28}}
          data={[...userData?.reserve]?.reverse()}
          keyExtractor={(item) => item?._id?.toString()}
          renderItem={renderItem}
        />
        </View>)
      }
    </View>
    

  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    marginHorizontal: 8,
    color: '#fff',
  },
  notificationContainer: {
    // flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    marginBottom: 45,
    borderRadius: 8,
    elevation: 4,
    alignItems: "center"
  },
  notificationText: {
    fontSize: 16,
    color: '#000',
  },
  notificationSubtitle: {
    fontSize: 20,
    color: '#000',
    marginLeft: 5,
  },
});

export default Schedule