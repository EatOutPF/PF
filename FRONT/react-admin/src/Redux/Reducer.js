import { GET_ALL_RESTAURANTS, LOGOUT_USER, SET_USER, FILTER_BY_DIETS } from "./Actions";

const initialState = {
  allRestaurants: [],
  user: null,
  detailRestaurant: {},
  currentListRestaurants: [],
  stateToFilters: [], 
};

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    
    case GET_ALL_RESTAURANTS:
      return { ...state, currentListRestaurants: payload };
   
      case SET_USER:
      return { ...state, user: payload.user };
    
      case LOGOUT_USER:
      return { ...state, user: payload };

      case FILTER_BY_DIETS:
        const filterByDiets = state.currentListRestaurants.filter((restaurant) =>
          restaurant.diets.includes(payload)
        );
        return { ...state, currentListRestaurants: filterByDiets };
      
    default:
      return { ...state };
  }
};

export default Reducer;