import axios from "axios";
import restaurants from "../restaurants.json";

const baseUrl = "http://localhost:3001/restaurant";

export const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const getAllRestaurants = () => {
  return {
    type: GET_ALL_RESTAURANTS,
    payload: restaurants,
  };

  /* async (dispatch) => {
    const response = await axios.get(baseUrl);
    console.log(response.data);
    dispatch({
      type: GET_ALL_RESTAURANTS,
      payload: response.data,
    });}; */
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});
