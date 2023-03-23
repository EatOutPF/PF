import { 
    GET_ALL_RESTORANTS,
    FILTER_CARDS,
    ORDER_CARDS,
} from "./type";
import restorantsJson from '../../data/restaurants.json'

const initialState = {

    allRestorants: [],
    restorantsFound: [],

}

// REDUCER
export default function rootReducer(state = initialState, action) {

    function sortAsc(aux){
        return aux.sort((a, b) => {
            if (a.name > b.name) {
                return 1;
            }
            if (a.name < b.name) {
                return -1;
            }
            return 0;
        });
    }

    function sortDes(aux) {
        return aux.sort((a, b) => {
            if (a.name > b.name) {
                return -1;
            }
            if (a.name < b.name) {
                return 1;
            }
            return 0;
        });
    }

//   function sortPopAsc(aux){
//       return aux.sort((a, b) => {
//         return a.population - b.population;
//       });
//     }

//     function sortPopDes(aux) {
//       return aux.sort((a, b) => {
//         return b.population - a.population;
//       });
//     }


    switch(action.type) {
  //------------------------------------------------------------------------- 
        case GET_ALL_RESTORANTS:  {
            // console.log(restorantsJson);
            return{ ...state, allCountries: restorantsJson, countriesFound: sortAsc(restorantsJson) }
        }

  //-------------------------------------------------------------------------    
        case FILTER_CARDS:{ 
            
            // const auxAllCountries = [...state.allCountries];
            // state.countriesFound = [...state.allCountries]

            // if( (state.filterByActivity === "All") && (state.filterByContinent === "All") ){
            //   return{
            //   ...state,  
            //   countriesFound: auxAllCountries, 
            //   filterByContinent: action.payload}
            // }

            // else if( (state.filterByActivity === "All") && (state.filterByContinent !== "All")){
            //   const filterCountry = auxAllCountries.filter(
            //       fav => { if( (fav.continent === state.filterByContinent )) return fav } 
            //     );
            //   return{
            //     ...state,  
            //     countriesFound: filterCountry, 
            //     filterByContinent: action.payload
            //   }
            // }
            
            // else if ( (state.filterByActivity !== "All")  && (state.filterByContinent === "All") ) {
            //   const filterCountry = state.countriesFound.filter(
            //       fav => {
            //         if(( ( fav.Activities?.includes( state.filterByActivity )) ) 
            //         )return fav;
            //       })
            //   return{
            //     ...state,  
            //     countriesFound: filterCountry, 
            //     filterByContinent: action.payload
            //   }  
            // }

            // else if ( (state.filterByActivity !== "All")  && (state.filterByContinent !== "All") ){
            //   const filterCountry = state.countriesFound.filter(
            //     fav => {
            //       if(( ( fav.Activities?.includes( state.filterByActivity )) && (fav.continent === state.filterByContinent ) ) 
            //       )return fav;
            //     })
            //   return{
            //     ...state,  
            //     countriesFound: filterCountry, 
            //     filterByContinent: action.payload
            //   }  
            // }
  
          }
  
  //-------------------------------------------------------------------------              
        case ORDER_CARDS:
          // let filtradoOrder = [];
            switch(action.payload) {
            
                case "az":{
                    state.orderState = action.payload
                    const all = sortAsc([...state.allCountries], "name")
                    const found = sortAsc([...state.countriesFound], "name")
                    return{ ...state, allCountries: all, countriesFound: found }
                }
                case "za":{
                    state.orderState = action.payload
                    const all = sortDes([...state.allCountries],)
                    const found = sortDes([...state.countriesFound],)
                    return{ ...state, allCountries: all, countriesFound: found }
                }
                
                case "lp":{
                    state.orderState = action.payload
                    const all = sortPopAsc([...state.allCountries],)
                    const found = sortPopAsc([...state.countriesFound], ) 
                    return{ ...state, allCountries: all, countriesFound: found }
                } 
                
                case "hp":{
                    state.orderState = action.payload
                    const all = sortPopDes([...state.allCountries],)
                    const found = sortPopDes([...state.countriesFound],)
                    return{ ...state, allCountries: all, countriesFound: found }
                }
            
            }
          // if(action.payload === "za"){
          //   const all = sortAsc([...state.allCountries], "name")
          //   const found = sortAsc([...state.countriesFound], "name")
          //   return{ ...state, allCountries: all, countriesFound: found }
          // }
          // else if(action.payload === "az"){
          //   const all = sortDes([...state.allCountries],)
          //   const found = sortDes([...state.countriesFound],)
          //   return{ ...state, allCountries: all, countriesFound: found }
          // }
          // else if(action.payload === "hp"){
          //   const all = sortPopAsc([...state.allCountries],)
          //   const found = sortPopAsc([...state.countriesFound], )
          //   return{ ...state, allCountries: all, countriesFound: found }
          // }
          // else if(action.payload === "lp"){
          //   const all = sortPopDes([...state.allCountries],)
          //   const found = sortPopDes([...state.countriesFound],)
          //   return{ ...state, allCountries: all, countriesFound: found }
          // }

        default:
            return state;
    }

};

//   module.exports = contador;