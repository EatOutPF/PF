import {
  GET_ALL_RESTAURANTS,
  LOGOUT_USER,
  SET_USER,
  MODIFY_RESTAURANT,
  DETAIL_RESTAURANT,
  FILTER_BY_DIETS,
  ERROR_MSSG,
  GET_RESTAURAN_NAME,
} from "./Actions";

const initialState = {
  allRestaurants: [],
  user: null,
  detailRestaurant: {},
  currentListRestaurants: [],
  stateToFilters: [],
  msg: "",
};

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return { ...state, currentListRestaurants: payload };
    case SET_USER:
      return {
        ...state,
        currentListRestaurants: payload,
        allRestaurants: payload,
      };
    case LOGOUT_USER:
      return { ...state, user: payload };
    case DETAIL_RESTAURANT:
      return {
        ...state,
        detailRestaurant: payload,
      };
    case MODIFY_RESTAURANT:
      return {
        ...state,
        allRestaurants: state.allRestaurants.map((r) => {
          return +r._id === +payload.dataToUpdate._id
            ? payload.dataToUpdate
            : r;
        }),
      };
    case FILTER_BY_DIETS:
      const filterByDiets = state.currentListRestaurants.filter((restaurant) =>
        restaurant.diets.includes(payload)
      );
      return { ...state, currentListRestaurants: filterByDiets };
    case ERROR_MSSG:
      return {
        ...state,
        msg: payload,
        allRestaurants: [],
      };
    case GET_RESTAURAN_NAME:
      return { ...state, currentListRestaurants: payload };
    default:
      return { ...state };
  }
};

export default Reducer;
