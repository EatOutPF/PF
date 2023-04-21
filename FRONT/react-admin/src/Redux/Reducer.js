import {
  GET_ALL_RESTAURANTS,
  LOGOUT_USER,
  SET_USER,
  MODIFY_RESTAURANT,
  DETAIL_RESTAURANT,
  ERROR_MSSG,
  GET_RESTAURAN_NAME,
  DELETE_RESTAURANT,
  POST_RESTAURANT,
  ORDER_BY_NAME,
  ORDER_BY_POPULARITY,
  SET_TOKEN,
  GET_ALL_USERS,
  POST_USERS,
  GET_ALL_RESTAURANTS_BY_USER,
  FILTERS_OPTIONS,
  SORT_BY_RESTAURANT_BY_USER,
  SORT_BY_POPULARITY_BY_RESTAURANT_USER,
  DELETE_USER,
  POST_OPTIONS,
  SEARCH_BY_RESTAURANT_BY_USER,
  GET_USER_BY_ID,
  DETAIL_USER,
  UPDATE_USER,
  ADD_ADMIN,
} from "./Actions";
// import { filterOptions } from "./utils";

const initialState = {
  createRestaurant: [],
  stateToSorted: [],
  allRestaurants: [],
  user: {},
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
  token: null,
  currentUsers: [],
  currentListRestaurantsByUser: [],
  allRestaurantsByUser: [],
  detailUser: {},
  optionsRole: ["superadmin", "admin", "user"],
};

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return {
        ...state,
        filteredData: payload,
        currentListRestaurants: payload,
        allRestaurants: payload,
      };

    case SET_USER:
      return { ...state, user: payload };

    case LOGOUT_USER:
      return { ...state, user: payload };

    case FILTERS_OPTIONS:
      let filters =
        state.user?.role === "superadmin"
          ? state.allRestaurants
          : state.allRestaurantsByUser;

      if (payload.diets) {
        filters = filters?.filter((restaurant) =>
          restaurant.diets?.includes(payload.diets)
        );
      }
      if (payload.menu) {
        filters = filters?.filter((restaurant) =>
          restaurant.menu?.includes(payload.menu)
        );
      }
      if (payload.active === "active") {
        filters = filters?.filter((restaurant) => restaurant.active);
      }
      if (payload.active === "inactive") {
        filters = filters?.filter((restaurant) => !restaurant.active);
      }

      return state.user?.role === "superadmin"
        ? {
            ...state,
            currentListRestaurants: filters,
          }
        : {
            ...state,
            currentListRestaurantsByUser: filters,
          };

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

    case DELETE_USER:
      return { ...state, message: payload };

    case SET_TOKEN:
      return {
        ...state,
        token: [payload],
      };

    case POST_RESTAURANT:
      return {
        ...state,
        msg: payload,
      };

    case ORDER_BY_NAME:
      let sorted;
      payload === "asc"
        ? (sorted = state.currentListRestaurants?.sort((a, z) =>
            a.name > z.name ? 1 : -1
          ))
        : payload === "desc"
        ? (sorted = state.currentListRestaurants?.sort((a, z) =>
            a.name < z.name ? 1 : -1
          ))
        : (sorted = state.stateToSorted);
      return {
        ...state,
        stateToSorted: sorted.map((e) => e),
      };

    case ORDER_BY_POPULARITY:
      let data;
      payload === "max"
        ? (data = state.currentListRestaurants?.sort((a, b) =>
            a.ranking < b.ranking ? 1 : -1
          ))
        : payload === "min"
        ? (data = state.currentListRestaurants?.sort((a, b) =>
            a.ranking > b.ranking ? 1 : -1
          ))
        : (data = state.stateToSorted);
      return {
        ...state,
        stateToSorted: data.map((e) => e),
      };

    case GET_ALL_USERS:
      return {
        ...state,
        currentUsers: payload,
      };

    case POST_USERS:
      return {
        ...state,
        currentUsers: payload,
      };

    case GET_ALL_RESTAURANTS_BY_USER:
      return {
        ...state,
        currentListRestaurantsByUser: payload?.restaurant,
        allRestaurantsByUser: payload?.restaurant,
      };

    case SORT_BY_RESTAURANT_BY_USER:
      let sortedByUser = state.currentListRestaurantsByUser;
      if (sortedByUser && payload === "asc")
        sortedByUser = sortedByUser?.sort((a, z) => (a.name > z.name ? 1 : -1));
      if (sortedByUser && payload === "desc")
        sortedByUser = sortedByUser?.sort((a, z) => (a.name < z.name ? 1 : -1));
      return {
        ...state,
        currentListRestaurantsByUser: sortedByUser,
      };

    case SORT_BY_POPULARITY_BY_RESTAURANT_USER:
      let sortedByPopularity = state.currentListRestaurantsByUser;
      if (sortedByPopularity && payload === "max")
        sortedByPopularity = sortedByPopularity?.sort((a, b) =>
          a.ranking < b.ranking ? 1 : -1
        );
      if (sortedByPopularity && payload === "min")
        sortedByPopularity = sortedByPopularity?.sort((a, b) =>
          a.ranking > b.ranking ? 1 : -1
        );
      return {
        ...state,
        currentListRestaurantsByUser: sortedByPopularity,
      };

    case POST_OPTIONS:
      return {
        ...state,
        msg: payload,
      };

    case SEARCH_BY_RESTAURANT_BY_USER:
      let searchRestaurant = state.allRestaurantsByUser?.filter((r) =>
        r.name?.toLowerCase().includes(payload.toLowerCase())
      );

      if (searchRestaurant)
        return {
          ...state,
          currentListRestaurantsByUser: searchRestaurant,
        };
      break;

    case GET_USER_BY_ID:
      return {
        ...state,
        detailUser: payload,
      };
    case DETAIL_USER:
      return { ...state, detailUser: payload };
    case UPDATE_USER:
      return { ...state, message: payload };
    case ADD_ADMIN:
      return { ...state, message: payload };

    default:
      return { ...state };
  }
};

export default Reducer;
