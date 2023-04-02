import axios from "axios";
import {
    GET_ALL_RESTORANTS,
    GET_RESTORANT_BY_ID,
    GET_RESTORANT_BY_STRING,
    FILTER_CARDS,
    ORDER_CARDS,
    CLEAR_STATE_RESTORANT_BY_ID,
    CLEAR_STATE_RESTORANT_BY_STRING,
    CLEAR_SEARCH_TEXT,
    SET_SEARCH_TEXT,
    GET_TYPES_FOODS,
    GET_ATMOSPHERE,
    GET_SECTIONS,
    GET_DIET,
    GET_EXTRA,
    FILTER_RESTORANTS,
} from "./type";

// esto hay que cambiarlo a la IP que tiene el servidor
// ya que es diferente a la IP del Celular
const DB_HOST = "https://eatout.onrender.com"// ip de la pc con el server corriendo

// ACTION CREATORS
export function getAllRestorants() {
    return async (dispatch) => {
        await axios
            .get(`${DB_HOST}/restaurant`)
            .then((response) => {
                // console.log("RESPONSE -> ", response);
                dispatch({
                    type: GET_ALL_RESTORANTS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_ALL_RESTORANTS,
                    payload: error.message,
                });
            });
    };
}

export function filterCards(status) {
    return {
        type: FILTER_CARDS,
        payload: status,
    };
}

export function orderCards(status) {
    return {
        type: ORDER_CARDS,
        payload: status,
    };
}

export function clearStateResatorantById(status) {
    return {
        type: CLEAR_STATE_RESTORANT_BY_ID,
        payload: status,
    };
}

export function clearStateResatorantByString(status) {
    return {
        type: CLEAR_STATE_RESTORANT_BY_STRING,
        payload: status,
    };
}

export function clearSearchText(status) {
    return {
        type: CLEAR_SEARCH_TEXT,
        payload: status,
    };
}

export function setSearchText(status) {
    return {
        type: SET_SEARCH_TEXT,
        payload: status,
    };
}

export function searchRestorantById(id) {
    return async (dispatch) => {
        await axios
            .get(`${DB_HOST}/restaurant/${id}`)
            .then((response) => {
                // console.log("RESPONSE -> ", response);
                dispatch({
                    type: GET_RESTORANT_BY_ID,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_RESTORANT_BY_ID,
                    payload: error.message,
                });
            });
    };
}

export function searchRestorantByString(string) {
    // console.log("soy el action:", string);
    return async (dispatch) => {
        axios
            .get(`${DB_HOST}/restaurant?name=${string}`)
            .then((response) => {
                // console.log("RESPONSE del action -> ", response);
                dispatch({
                    type: GET_RESTORANT_BY_STRING,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_RESTORANT_BY_STRING,
                    payload: error.message,
                });
            });
    };
}

export const getTypesOfFoods = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${DB_HOST}/menu`);
            return dispatch({
                type: GET_TYPES_FOODS,
                payload: response.data,
            });
        } catch (error) {
            return {
                error: "No se encontraron tipos de comida",
                originalError: error,
            };
        }
    };
};

export const getAtmosphere = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${DB_HOST}/atmosphere`);
            return dispatch({
                type: GET_ATMOSPHERE,
                payload: response.data,
            });
        } catch (error) {
            return {
                error: "No se encontraron tipos de ambientes",
                originalError: error,
            };
        }
    };
};

export const getSections = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${DB_HOST}/section`);
            return dispatch({
                type: GET_SECTIONS,
                payload: response.data,
            });
        } catch (error) {
            return {
                error: "No se encontraron espacios disponibles",
                originalError: error,
            };
        }
    };
};

export const getDiet = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${DB_HOST}/diet`);
            return dispatch({
                type: GET_DIET,
                payload: response.data,
            });
        } catch (error) {
            return {
                error: "No se encontraron tipos de dietas",
                originalErrorMessage: error,
            };
        }
    };
};

export const getExtras = () => {
    return async function (dispatch) {
        try {
            let response = await axios.get(`${DB_HOST}/extra`);
            return dispatch({
                type: GET_EXTRA,
                payload: response.data,
            });
        } catch (error) {
            return {
                error: "No se econtraron opciones extras",
                originalErrorMessage: error,
            };
        }
    };
};

export const filterRestorant = (payload) => {
    return {
        type: FILTER_RESTORANTS,
        payload,
    };
};

// export const getAsmosphere = () => {
//     return async function (dispatch) {
//         try {
//             let response = await axios.get(`${DB_HOST}/menu`);
//             return dispatch ({
//                 type: GET_TYPES_FOODS,
//                 payload: response.data,
//             });
//         } catch (error) {
//             return {
//                 error: 'No se encontraron tipos de comida',
//                 originalError: error,
//             }
//         }
//     }
// }

//   export function saveCurrentePage (id){
//       return {
//           type: SAVE_PERPAGE,
//           payload: id
//       }
//   };

//   export function clearState (id){
//       return {
//           type: CLEAR_STATE,
//           payload: id
//       }
//   };

//   export function clearError (status){
//       return {
//           type: CLEAR_STATE,
//           payload: status
//       }
//   };

//   export function setFilterByContinent (id){
//       return {
//           type: SET_FILTER_BY_CONTINENT,
//           payload: id
//       }
//   };

//   export function setFilterByActivity (id){
//       return {
//           type: SET_FILTER_BY_ACTIVITY,
//           payload: id
//       }
//   };

//   export function getAllCountries (){
//     return async (dispatch) => {
//         await fetch("http://localhost:3001/api/countries/")
//         .then((r)=> r.json())
//         .then((data) => {
//             dispatch({
//                 type: GET_ALL,
//                 payload: data
//             })
//         })
//         .catch(error => {
//             dispatch(apiError(error.message))
//         })
//     }
// };

// export function getCountryDetailByID(id){
//     return async (dispatch) => {
//         await fetch(`http://localhost:3001/api/countries/id/${id}`)
//             .then((r)=> r.json())
//             .then((data) => {
//                 dispatch({
//                     type: GET_COUNTRY_DETAIL_BY_ID,
//                     payload: data
//                 })
//                 dispatch(apiError(null));
//             })
//             .catch(error => {
//                 dispatch(apiError(error.message))
//             })
//         }
// };

// export function getCountryDetailByString(string){
//     return async (dispatch) => {
//         await fetch(`http://localhost:3001/api/countries/s?name=${string}`)
//             .then((r)=> r.json())
//             .then((data) => {
//                 dispatch({
//                     type: GET_COUNTRY_DETAIL_BY_STRING,
//                     payload: data
//                 })
//                 dispatch(apiError(null));
//             })
//             .catch(error => {
//                 console.error('Error:', error);
//                 dispatch(apiError("Country doesn't found"))
//             })
//     }
// };

// export function getActivities(){
//     return async (dispatch) => {
//         await fetch("http://localhost:3001/api/activities/")
//         .then((r)=> r.json())
//         .then((data) => {
//             dispatch({
//                 type: GET_ACTIVITIES,
//                 payload: data
//             })
//             dispatch(apiError(null));
//         })
//         .catch(error => {
//             dispatch(apiError(error.message))
//         })
//     }
// };

// export function createActivity(activity) {
//     return async (dispatch) => {
//       await fetch("http://localhost:3001/api/activities/CreateActivity", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(activity),
//       })
//         .then((r) => r.json())
//         .then((result) => {
//           dispatch({
//             type: CREATE_ACTIVITY,
//             payload: activity });
//           dispatch(apiError(result));
//         })
//         .catch(error => {
//             console.log("***********",Object.keys(error));
//             dispatch(apiError(error.message))
//         })

//     };
//   }

//   export function createAdvancedActivity(activities) {
//     return async (dispatch) => {
//       await fetch("http://localhost:3001/api/activities/AddExistingActivitiesToCountries", {
//         method: "POST",
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(activities),
//       })
//         .then((r) => r.json())
//         .then((result) => {
//           dispatch({
//             type: CREATE_ADVANCED_ACTIVITY,
//             payload: activities });
//           dispatch(apiError(null));
//         })
//         .catch(error => {
//             dispatch(apiError(error.message))

//         })

//     };
//   }

// export function filterCardsByActivity (status){
//     return {
//         type: FILTER_CARDS_BY_ACTIVITY,
//         payload: status
//     }
// };
