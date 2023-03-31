import {
  GET_ALL_RESTAURANTS,
  LOGOUT_USER,
  SET_USER,
  MODIFY_RESTAURANT,
  DETAIL_RESTAURANT,
  FILTER_BY_DIETS,
  ERROR_MSSG,
  GET_RESTAURAN_NAME,
  DELETE_RESTAURANT,
  POST_RESTAURANT,
  SET_TOKEN,
  FILTER_BY_MENU,
  FILTER_BY_ACTIVE
} from "./Actions";

const initialState = {
  createRestaurant:[],
  allRestaurants: [],
  user: null,
  detailRestaurant: {},
  currentListRestaurants: [],
  message: "",
  filteredData: [],
  optionsMenu: [
    "italiana",
    "asiática",
    "internacional",
    "hamburguesas",
    "alta cocina",
    "bares",
    "pizzerías",
    "mediterránea",
    "gourmet",
  ],
  optionsAtmosphere: ["musica en vivo", "familiar", "romantico", "formal"],
  optionsDiets: ["vegano", "celiaco", "vegetariano"],
  optionpaymentMethods: [
    "efectivo",
    "debito",
    "credito",
    "transferencia",
    "mercadopago",
  ],
  optionsExtras: ["petfriendly", "bar", "wi-fi", "fumadores", "menú para niño"],
  optionsSection: ["salón principal", "terraza", "barra"],
  msg: "",
  token: null
};

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return {
        ...state,
        currentListRestaurants: payload,
      };

    case SET_USER:
      return { ...state, user: payload.user };

    case LOGOUT_USER:
      return { ...state, user: payload };

    case FILTER_BY_DIETS:
      const filterByDiets = state.currentListRestaurants.filter((restaurant) =>
        restaurant.diets.includes(payload)
      );
      return { ...state, currentListRestaurants: filterByDiets };
     
     
    case FILTER_BY_MENU:
        const filterBymenu= state.currentListRestaurants.filter((e)=>
          e.menu.includes(payload)
        )
        return{ ...state, currentListRestaurants: filterBymenu}

    case FILTER_BY_ACTIVE: 
  
    const filteredData = state.currentListRestaurants.filter((item) => item.active === payload
    );
    return {
      ...state,
     currentListRestaurants: filteredData }



    case DETAIL_RESTAURANT:
      return {
        ...state,
        detailRestaurant: payload,
      };
    case MODIFY_RESTAURANT:
      return {
        ...state,
        message: payload,
      };

    case ERROR_MSSG:
      return {
        ...state,
        msg: payload,
        allRestaurants: [],
      };
    case GET_RESTAURAN_NAME:
      return { ...state, currentListRestaurants: payload };
    case DELETE_RESTAURANT:
      return { ...state, message: payload };
    
    case POST_RESTAURANT:
      return {
       
        ...state,
      createRestaurant:[...state.createRestaurant,payload]
      };
    
    case SET_TOKEN:
        return {
          ...state,
          token: [payload],
        };

    default:
      return { ...state };



    

  }


}

export default Reducer;
