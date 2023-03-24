import axios from "axios";
import restaurants from "../restaurants.json";

const baseUrl = "http://localhost:5001";

export const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const MODIFY_RESTAURANT = "MODIFY_RESTAURANT";
export const DETAIL_RESTAURANT = "DETAIL_RESTAURANT";

export const getAllRestaurants = () => {
  return async (dispatch) => {
    axios
      .get(`${baseUrl}/restaurant`)
      .then((response) => {
        dispatch({
          type: GET_ALL_RESTAURANTS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ALL_RESTAURANTS,
          payload: error.message,
        });
      });
  };
};

export const setUser = (user) => ({
  type: SET_USER,
  payload: { user },
});

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const findDetailRestaurant = (id) => {
  return async (dispatch) => {
    const result = await axios(`${baseUrl}/restaurant${id}`);
    dispatch({
      type: DETAIL_RESTAURANT,
      payload: result.data,
    });
  };
};

export const modifyRestaurant = (dataToUpdate, allRestaurants) => {
  return async (dispatch) => {
    await fetch(`${baseUrl}/${dataToUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((response) => response.json())
      .then((modifiedRestaurant) => {
        dispatch({
          type: MODIFY_RESTAURANT,
          payload: { dataToUpdate, modifiedRestaurant, allRestaurants },
        });
      })
      .catch((error) => {
        return dispatch({
          type: MODIFY_RESTAURANT,
          payload: error,
        });
      });
  };
};
