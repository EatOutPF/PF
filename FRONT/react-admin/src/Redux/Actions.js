import axios from "axios";
import restaurants from "../restaurants.json";

const baseUrl = "http://localhost:3001/restaurant";

export const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";

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
