import axios from "axios";
import { updateMapper } from "./utils";

const baseUrl = "http://localhost:5001";

export const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const MODIFY_RESTAURANT = "MODIFY_RESTAURANT";
export const DETAIL_RESTAURANT = "DETAIL_RESTAURANT";

export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ERROR_MSSG = "ERROR_MSSG";
export const GET_RESTAURAN_NAME = "GET_RESTAURAN_NAME";

export const getAllRestaurants = () => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/restaurant`)
      .then((response) => {
        dispatch({
          type: "GET_ALL_RESTAURANTS",
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

export const getFilterByDiets = (comida) => {
  return {
    type: FILTER_BY_DIETS,
    payload: comida,
  };
};
export const findDetailRestaurant = (id) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/restaurant?id=${id}`)
      .then((result) =>
        dispatch({
          type: DETAIL_RESTAURANT,
          payload: result.data,
        })
      )
      .catch((err) => {
        dispatch({
          type: DETAIL_RESTAURANT,
          payload: err.response.data,
        });
      });
  };
};

export const modifyRestaurant = (dataToUpdate) => {
  let restaurant = updateMapper(dataToUpdate);
  console.log("action", restaurant);

  return (dispatch) => {
    axios
      .put(`${baseUrl}/restaurant/${dataToUpdate.id}`, restaurant)
      .then((result) => {
        dispatch({
          type: MODIFY_RESTAURANT,
          payload: result,
        });
      })
      .catch((error) => {
        console.log("error back", error);
        return dispatch({
          type: MODIFY_RESTAURANT,
          payload: error.response?.data?.error,
        });
      });
  };
};

export const getAllRestauranName = (name) => {
  return async function (dispatch) {
    if (name === "") {
      return dispatch({ type: ERROR_MSSG });
    }
    try {
      let RestauranByName = await axios.get(
        `${baseUrl}/restaurant?name=${name}`
      );
      return dispatch({
        type: GET_RESTAURAN_NAME,
        payload: [RestauranByName.data],
      });
    } catch (error) {
      console.log(error);
    }
  };
};
