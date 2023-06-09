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
    GET_LINK_MERCADOPAGO,
    CLEAR_LINK_MERCADOPAGO,

    CREATE_USER,
    USER_GMAIL,

    SET_USER_TOKEN,
    CLEAR_USER_TOKEN,

    SET_NOTIFICATION_NUMBER,

    GET_USER_INFO,
    SET_USER_INFO,
    CLEAR_USER_INFO,

    GET_TYPES_FOODS,
    GET_ATMOSPHERE,
    GET_SECTIONS,
    GET_DIET,
    GET_EXTRA,
    FILTER_RESTORANTS,

    POST_FAVORITE,
    FETCH_FAVORITES,

    POST_REVIEWS,
    GET_USER_LOCATION,
    UBICATION_BY_RESTORANT,

} from "./type";
import { log } from "react-native-reanimated";

// esto hay que cambiarlo a la IP que tiene el servidor
// ya que es diferente a la IP del Celular
const DB_HOST = "https://eatout.onrender.com"// ip de la pc con el server corriendo
//const DB_HOST = "http://localhost:5001/"// ip de la pc con el server corriendo


// ACTION CREATORS
export function getAllRestorants() {
    return async (dispatch) => {
        await axios
            .get(`${DB_HOST}/restaurant`)
            .then((response) => {
                 console.log("FLOR ACTION GETRESTOS-> ", response);
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
                //console.log("RESPONSE del action -> ", response);
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


export function getLinkMercadoPago(value) {
    // console.log("soy el action:", value);
    // console.log("-------------------------------------------");
    return async (dispatch) => {
        axios
            .post(`${DB_HOST}/mercadopago`, value)
            .then((response) => {
                // console.log("RESPONSE del action -> ", response);
                dispatch({
                    type: GET_LINK_MERCADOPAGO,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log("Error axion: ", error.message);
                dispatch({
                    type: GET_LINK_MERCADOPAGO,
                    payload: error.message,
                });
            });
    };
}

export function clearLinkMercadoPago() {
    return {
        type: CLEAR_LINK_MERCADOPAGO,
        payload: "",
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
        payload: payload,
    };
};
//-----------POST DE FAVORITES-----------------------------
export const PostsFavorite = (restaurant, user) => {
    return async dispatch => {
      try {
        const response = await axios.post(`${DB_HOST}/favorite`,  {restaurant: restaurant, user: user});
        
        dispatch({ type: POST_FAVORITE, payload: response.data });
      } catch (error) {
    
      }
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
export const createUser = (payload) => {

}

export const setUserToken = (payload) => {
    // console.log("setUserToken: ", payload?.stsTokenManager?.accessToken);
    // getUserInfo(payload?.stsTokenManager?.accessToken)
    return {
        type: SET_USER_TOKEN,
        payload: payload,
    };

};

export const clearUserToken = (payload) => {
    return {
        type: CLEAR_USER_TOKEN,
        payload: {},
    };
};

export const getUserInfo = (token) => {
    console.log("GETUSERINFO: ", token);
    setUserToken(token)
    console.log("GETUSERINFO TOKEN: ", token?.stsTokenManager?.accessToken);

    return async (dispatch) => {
        axios
            .get(`${DB_HOST}/users`, {
                headers: {
                    Authorization: "Bearer " + token?.stsTokenManager?.accessToken,
                }
            })
            .then((response) => {
                // console.log("RESPONSE del action -> ", response);
                dispatch({
                    type: GET_USER_INFO,
                    payload: response.data,
                });
            })
            .catch((error) => {
                dispatch({
                    type: GET_USER_INFO,
                    payload: error.message,
                });
            });
    };

};
export const postListReviews = (value) => {

    return async (dispatch) => {
        axios
            .post(`${DB_HOST}/reviews/${value?.resto}`, value)
            .then((response) => {
            
                dispatch({
                    type: POST_REVIEWS,
                    payload: response.data,
                });
            })
            .catch((error) => {
                console.log("Error axion post review: ", error.message);
                dispatch({
                    type: POST_REVIEWS,
                    payload: error.message,
                });
            });
    };
};




export const setUserInfo = (payload) => {
    return {
        type: SET_USER_INFO,
        payload: payload,
    };
    
};

export const setNotificationNumber = (payload) => {
    return {
        type: SET_NOTIFICATION_NUMBER,
        payload: payload,
    };
    
};

export const clearUserInfo = (payload) => {
    return {
        type: CLEAR_USER_INFO,
        payload: {},
    };

};

export function fetchFavorites(_id) {
  return async dispatch => {
    const response = await axios.get(`${DB_HOST}/users/${_id}`);
    const favorites = response.restaurant;
    dispatch({
      type: FETCH_FAVORITES,
      payload:favorites,
    });
  };
}


export const getUserLocation = (payload) => {
    return {
        type: GET_USER_LOCATION,
        payload,
    }
}

export const getUbicationByRestorant = (payload) => {
    return {
        type: UBICATION_BY_RESTORANT,
        payload,
    }
}

export const userGmail = (payload) => {

    
    return async dispatch => {
        const response = await axios.post(`${DB_HOST}/gmail`, {email:payload});
        // console.log("RSEPONSE DEL GHMAIL", response?.data);
        // console.log("RSEPONSE DEL GHMAIL", response?.data?.user);

        dispatch({
          type: USER_GMAIL,
          payload: response?.data,
        });
      };
}

