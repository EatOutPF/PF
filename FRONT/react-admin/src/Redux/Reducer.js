import { GET_ALL_RESTAURANTS, LOGOUT_USER, SET_USER } from "./Actions";

const initialState = {
  allRestaurants: [],
  user: null,
  detailRestaurant: {},
  currentListRestaurants: [],
};

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_RESTAURANTS:
      return { ...state, currentListRestaurants: payload };
    case SET_USER:
      return { ...state, user: payload.user };
    case LOGOUT_USER:
      return { ...state, user: payload };
    default:
      return { ...state };
  }
};

export default Reducer;
