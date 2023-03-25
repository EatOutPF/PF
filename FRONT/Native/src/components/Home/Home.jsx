import React,{useEffect} from 'react'
import { Text, View } from 'react-native'
import RepositoryList from '../Restos/RestosList.jsx'
import Map from '../Map/Map.jsx'
import RepositoryList1 from '../Cards/RepositoryList.jsx'
import SelectComponent from '../filtradoaux/filtradoaux.jsx'


import AppBar from '../NavBar/AppBar.jsx'
import { Redirect, Route, Routes } from 'react-router-native'
import { useSelector, useDispatch,  } from 'react-redux';
import { filterCards, getAllRestorants, orderCards } from '../../redux/actions';

const Main = () => {
  const restorantes = useSelector(state => state.allRestorants);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestorants())

  }, []);

  return (
    <View style={{ flex: 1 , width: '100%', backgroundColor: "#c7c8c1"}}>
      {/* <RepositoryList /> */}
      <AppBar />       
        <Routes>
          <Route path='/' element= {<RepositoryList />} />
          <Route path='/claudio' element= {<RepositoryList1/>} />
          <Route path='/mapview' element= {<Map data={RepositoryList}/>} />
          <Route path='/pagerview' element={<SelectComponent/>} />
          <Route path='/signin' element= { <Text>Working on it</Text> } 
          />
         {/* <Redirect to='/' /> */}
        </Routes> 
      {/* <Text> SOY EL TEXTO DE MAIN asdasa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa as dasdkjkj asldasldjlahsjdhasldajhsdalks aslasdlasd asd</Text> */}
    </View>
  )
}

export default Main