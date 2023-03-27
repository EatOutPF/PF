import { 
    GET_ALL_RESTORANTS,
    GET_RESTORANT_BY_ID,
    GET_RESTORANT_BY_STRING,
    CLEAR_STATE_RESTORANT_BY_ID,
    CLEAR_STATE_RESTORANT_BY_STRING,

    FILTER_CARDS,
    ORDER_CARDS,
} from "./type";

// import restorantsJson from '../../data/restaurants.json'

const initialState = {

    allRestorants: [],
    restorantsFound: [],
    restorantsFiltered: [],

    userInfo: {},

    restorantById: {},
    restorantByString: [],

    filterByMenu:"All",
    filterByAtmosphere: "All",
    filterBySection: "All",
    filterByDiets: "All",
    filterByExtras: "All",

    orderState:"az",

}

// REDUCER
export default function rootReducer(state = initialState, action) {

    

    switch(action.type) {
  //------------------------------------------------------------------------- 
        case GET_ALL_RESTORANTS:  {
            // console.log("HOLAA : ", action.payload);
            return{ ...state, 
                allRestorants: action.payload, 
                restorantsFound: action.payload
            }
        }
  //------------------------------------------------------------------------- 
        case GET_RESTORANT_BY_ID:  {
            // console.log(restorantsJson);
            return{ ...state, restorantById: action.payload, }
        }
         //------------------------------------------------------------------------- 
        case CLEAR_STATE_RESTORANT_BY_ID:  {
            // console.log(restorantsJson);
            return{ ...state, restorantById: {}, }
        }
  //------------------------------------------------------------------------- 
        case GET_RESTORANT_BY_STRING:  {
            // console.log(restorantsJson);
            //return{ ...state, allRestorants: action.payload, restorantsFound: sortAsc(action.payload) }
        }

  //-------------------------------------------------------------------------    
        case FILTER_CARDS:{ 
            // state.filterByExtras = action.payload;
            const auxAllRestorants = [...state.allRestorants];
            // state.restorantsFiltered = [...state.allRestorants]

            const filteredRestorants = auxAllRestorants.filter(resto =>
                (resto.menu.includes(state.filterByMenu) || resto.menu === 'All') &&
                (resto.atmosphere.includes(state.filterByAtmosphere) || resto.atmosphere === 'All') &&
                (resto.section.includes(state.filterBySection) || resto.section === 'All') &&
                (resto.diets.includes(state.filterByDiets) || resto.diets === 'All') &&
                (resto.extras.includes(state.filterByExtras) || resto.extras === 'All')
            );
            return {
                ...state, restorantsFiltered: filteredRestorants,
            }

        }

  //-------------------------------------------------------------------------              
        case ORDER_CARDS:
          // let filtradoOrder = [];
            switch(action.payload) {
            
                case "az":{
                    state.orderState = action.payload
                    const all = sortAsc([...state.allRestorants], "name")
                    const found = sortAsc([...state.restorantsFound], "name")
                    return{ ...state, allRestorants: all, restorantsFound: found }
                }
                case "za":{
                    state.orderState = action.payload
                    const all = sortDes([...state.allRestorants],)
                    const found = sortDes([...state.restorantsFound],)
                    return{ ...state, allRestorants: all, restorantsFound: found }
                }
                
                case "rk":{
                    const updatedState = {
                        ...state,
                        orderState: action.payload,
                        allRestorants: [...state.allRestorants].sort((a, b) => b.ranking - a.ranking),
                        restorantsFound: [...state.restorantsFound].sort((a, b) => b.ranking - a.ranking),
                    };
                    return updatedState;
                    // state.orderState = action.payload
                    // console.log("estado order: ",state.orderState);
                    // const all = [...state.allRestorants].sort((a, b) => a.ranking - b.ranking)
                    // const found = [...state.restorantsFound].sort((a, b) => a.ranking - b.ranking)
                    // console.log("soy el All ordenado: ", all);
                    // return{ ...state, allRestorants: all, restorantsFound: found }
                } 

            }


        default:
            return state;
    }

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

    function sortRankingAsc(aux){
        return aux.sort((a, b) => {
            return a.ranking - b.ranking;
        });
    }


};

