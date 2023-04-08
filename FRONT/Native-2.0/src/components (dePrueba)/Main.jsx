import React from 'react'
import { Text, View } from 'react-native'
import RepositoryList from './RepositoryList.jsx'
import CarouselComponent from "./CarouselComponent.jsx"
import CarouselAux from "./CarouselAux.jsx"
import CarouselPagerView from "./CarouselPagerView"

import Map from "./Map.jsx"
// import Mapita from "./Mapita.jsx"



import AppBar from './AppBar.jsx'
import { Redirect, Route, Routes } from 'react-router-native'

const Main = () => {
  return (
    <View style={{ flex: 1 , width: '100%', backgroundColor: "#c7c8c1"}}>
      {/* <RepositoryList /> */}
      <AppBar />       
        <Routes>
          <Route path='/' element= {<RepositoryList />} />
          <Route path='/claudio' element= {<CarouselComponent />} />
          <Route path='/mapview' element= {<Map />} />
          <Route path='/pagerview' element={<CarouselPagerView/>} />

          <Route path='/signin' element= 
          {
            // <Carousel/>
            <CarouselAux/>
            // <Text>Working on it</Text>
          } 
          />
         {/* <Redirect to='/' /> */}
        </Routes> 
      {/* <Text> SOY EL TEXTO DE MAIN asdasa aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa as dasdkjkj asldasldjlahsjdhasldajhsdalks aslasdlasd asd</Text> */}
    </View>
  )
}

export default Main