import {
    GET_ALL_RESTORANTS,
    GET_RESTORANT_BY_ID,
    GET_RESTORANT_BY_STRING,
    CLEAR_STATE_RESTORANT_BY_ID,
    CLEAR_STATE_RESTORANT_BY_STRING,
    CLEAR_SEARCH_TEXT,
    SET_SEARCH_TEXT,

    FILTER_CARDS,
    ORDER_CARDS,

    GET_LINK_MERCADOPAGO,
    CLEAR_LINK_MERCADOPAGO,

    CREATE_USER,

    SET_USER_TOKEN,
    CLEAR_USER_TOKEN,

    GET_USER_INFO,
    CLEAR_USER_INFO,

    GET_TYPES_FOODS,
    GET_ATMOSPHERE,
    GET_SECTIONS,
    GET_DIET,
    GET_EXTRA,
    FILTER_RESTORANTS,
} from "./type";

// import restorantsJson from '../../data/restaurants.json'

const initialState = {
    allRestorants: [],
    allRestorantsCopy: [],

    restorantsFound: [],
    restorantsFiltered: [],

    userInfo: {},
    userToken: {},

    restorantById: {},
    restorantByString: [],

    checkoutLinkMP: "",
    checkoutLinkMPResponse: {},


    searchText: "",

    typesOfFoods: [],
    typesOfSections: [],
    typesOfAtmosphere: [],
    typesOfDiet: [],
    typesOfExtras: [],

    orderState: "az",
}

// ---------- REDUCER ----------
export default function rootReducer(state = initialState, action) {
    switch (action?.type) {

//------------------------------------------------------------------------- 
        case GET_ALL_RESTORANTS: {
            // console.log("HOLAA : ", action.payload);
            return {
                ...state,
                allRestorants: action?.payload,
                allRestorantsCopy: action?.payload,
                restorantsFound: action?.payload,
            }
        }
//------------------------------------------------------------------------- 
        case GET_RESTORANT_BY_ID: {
            // console.log(restorantsJson);
            return { ...state, restorantById: action?.payload, }
        }
//------------------------------------------------------------------------- 
        case CLEAR_STATE_RESTORANT_BY_ID: {
            // console.log(restorantsJson);
            return { ...state, restorantById: {}, }
        }
//------------------------------------------------------------------------- 
        case GET_RESTORANT_BY_STRING: {
            //console.log("reducer: ", action.payload);
            return { ...state, restorantsFound: action?.payload }
        }
//------------------------------------------------------------------------- 
        case CLEAR_STATE_RESTORANT_BY_STRING: {
            //console.log("reducer: ", action.payload);
            return { ...state, restorantsFound: state?.allRestorants, }
        }
//------------------------------------------------------------------------- 
        case CLEAR_SEARCH_TEXT: {
            //console.log("reducer: ", action.payload);
            return { ...state, searchText: "", }
        }
//------------------------------------------------------------------------- 
        case SET_SEARCH_TEXT: {
            //console.log("reducer: ", action.payload);
            return { ...state, searchText: action?.payload }
        }
//-------------------------------------------------------------------------    
        case GET_LINK_MERCADOPAGO: {
            // console.log("reducer: ", action.payload);
            console.log("soy el reducer de mp: ", action.payload);
            console.log("soy el reducer de mp link: ", action?.payload?.body?.sandbox_init_point);
            //   return () => clearTimeout(timer);
            return { ...state, checkoutLinkMPResponse: action?.payload, checkoutLinkMP: action?.payload?.body?.init_point }

        }
//------------------------------------------------------------------------- 
        case CLEAR_LINK_MERCADOPAGO: {
            //console.log("reducer: ", action.payload);
            return { ...state, checkoutLinkMPResponse: {}, checkoutLinkMP: "" }
        }
//-------------------------------------------------------------------------    
        case FILTER_CARDS: {
            // state.filterByExtras = action.payload;
            const auxAllRestorants = [...state?.allRestorants];
            // state.restorantsFiltered = [...state.allRestorants]

            const filteredRestorants = auxAllRestorants.filter(resto =>
                (resto.menu.includes(state?.filterByMenu) || resto?.menu === 'All') &&
                (resto.atmosphere.includes(state?.filterByAtmosphere) || resto?.atmosphere === 'All') &&
                (resto.section.includes(state?.filterBySection) || resto?.section === 'All') &&
                (resto.diets.includes(state?.filterByDiets) || resto?.diets === 'All') &&
                (resto.extras.includes(state?.filterByExtras) || resto?.extras === 'All')
            );
            return {
                ...state, restorantsFiltered: filteredRestorants,
            }

        }

//-------------------------------------------------------------------------              
        case ORDER_CARDS:
            switch (action?.payload) {

                //---------- A - Z ----------
                case "az": {    
                    const updatedState = {
                        ...state,
                        orderState: action?.payload,
                        allRestorants: sortAsc([...state?.allRestorants]),
                        restorantsFound: sortAsc([...state?.restorantsFound]),
                    };
                    return updatedState;
                }

                //---------- Z - A ----------
                case "za": {
                    const updatedState = {
                        ...state,
                        orderState: action?.payload,
                        allRestorants: sortDes([...state?.allRestorants]),
                        restorantsFound: sortDes([...state?.restorantsFound]),
                    };
                    return updatedState;
                }

                //---------- Mayor Ranking a Menor Ranking ----------
                case "rk": {
                    const updatedState = {
                        ...state,
                        orderState: action?.payload,
                        allRestorants: [...state?.allRestorants]?.sort((a, b) => b.ranking - a.ranking),
                        restorantsFound: [...state?.restorantsFound]?.sort((a, b) => b.ranking - a.ranking),
                    };
                    return updatedState;
                }

                //---------- Mayor Precio a Menor Precio ----------
                case "hp": {
                    const updatedState = {
                        ...state,
                        orderState: action?.payload,
                        allRestorants: [...state?.allRestorants]?.sort((a, b) => b.ranking - a.ranking),
                        restorantsFound: [...state?.restorantsFound]?.sort((a, b) => b.ranking - a.ranking),
                    };
                    return updatedState;
                }

                //---------- Menor Precio a Mayor Precio ----------
                case "lp": {
                    const updatedState = {
                        ...state,
                        orderState: action?.payload,
                        allRestorants: [...state?.allRestorants]?.sort((a, b) => a.ranking - b.ranking),
                        restorantsFound: [...state?.restorantsFound]?.sort((a, b) => a.ranking - b.ranking),
                    };
                    return updatedState;
                }

                //---------- Menor Distancia a Mayor Distancia ----------
                // case "km": {
                //     const updatedState = {
                //         ...state,
                //         orderState: action.payload,
                //         allRestorants: [...state.allRestorants].sort((a, b) => a.ranking - b.ranking),
                //         restorantsFound: [...state.restorantsFound].sort((a, b) => a.ranking - b.ranking),
                //     };
                //     return updatedState;
                // }
            }
//-----------------------------------------------------------------------------------------
        case GET_TYPES_FOODS: {
            return {
                ...state,
                typesOfFoods: action?.payload,
            }
        }
//-----------------------------------------------------------------------------------------
        case GET_ATMOSPHERE: {
            return {
                ...state,
                typesOfAtmosphere: action?.payload,
            }
        }
        case GET_SECTIONS: {
            return {
                ...state,
                typesOfSections: action?.payload,
            }
        }
//-----------------------------------------------------------------------------------------
        case GET_DIET: {
            return {
                ...state,
                typesOfDiet: action?.payload,
            }
        }
//-----------------------------------------------------------------------------------------
        case GET_EXTRA: {
            return {
                ...state,
                typesOfExtras: action?.payload,
            }
        }
//-----------------------------------------------------------------------------------------

        case FILTER_RESTORANTS: {
            const {
                menu, // => string
                ambiences,
                spaces,
                diet,
                extra
            } = action?.payload
            let arrayFiltered = [...state?.restorantsFound];

            if (menu) {
                arrayFiltered = arrayFiltered?.filter(el => el?.menu?.[0] === menu)
            }
            if (ambiences) {
                arrayFiltered = arrayFiltered?.filter(el => el?.atmosphere?.[0] === ambiences)
            }
            if (spaces) {
                arrayFiltered = arrayFiltered?.filter(el => el?.section?.[0] === spaces)
            }
            if (diet) {
                arrayFiltered = arrayFiltered?.filter(el => el?.diet?.[0] === diet)
            }
            if (extra) {
                arrayFiltered = array.arrayFiltered?.filter(el => el?.extra?.[0] === extra)
            }

            return {
                ...state,
                restorantsFound: arrayFiltered,
                // allRestorants: arrayFiltered,
            }
        }



//-----------------------------------------------------------------------------------------
        case SET_USER_TOKEN: {
            console.log("*************************************");
            console.log("token user: ", action.payload);
            return {
                ...state,
                userToken: action?.payload,
            }
        }
//-----------------------------------------------------------------------------------------
        case CLEAR_USER_TOKEN: {
            return {
                ...state,
                userToken: {},
            }
        }
//-----------------------------------------------------------------------------------------
        case GET_USER_INFO: {
            console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
            console.log(" user INFO: ", action.payload);
            return {
                ...state,
                userInfo: action?.payload,
            }
        }
//-----------------------------------------------------------------------------------------
        case CLEAR_USER_INFO: {
            return {
                ...state,
                userInfo: {},
            }
        }


//-----------------------------------------------------------------------------------------
        default:
            return state;
}



    function sortAsc(aux) {
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

    function sortRankingAsc(aux) {
        return aux.sort((a, b) => {
            return a.ranking - b.ranking;
        });
    }


};

