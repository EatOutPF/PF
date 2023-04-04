import axios from "axios";
import { updateMapper } from "./utils";
export const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const MODIFY_RESTAURANT = "MODIFY_RESTAURANT";
export const DETAIL_RESTAURANT = "DETAIL_RESTAURANT";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ERROR_MSSG = "ERROR_MSSG";
export const GET_RESTAURAN_NAME = "GET_RESTAURAN_NAME";
export const DELETE_RESTAURANT = "DELETE_RESTAURANT";
export const POST_RESTAURANT = "POST_RESTAURANT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_POPULARITY = "ORDER_BY_POPULARITY";
export const SET_TOKEN = "SET_TOKEN";
export const FILTER_BY_MENU = "FILTER_BY_MENU";
export const FILTER_BY_ACTIVE = "FILTER_BY_ACTIVE";
export const GET_ALL_USERS = "GET_ALL_USERS";
export const POST_USERS = "POST_USERS";
export const GET_ALL_RESTAURANTS_BY_USER = "GET_ALL_RESTAURANTS_BY_USER";

export const getAllRestaurants = () => {
  return (dispatch) => {
    axios
      .get(`/restaurant`)
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

export const setUser = (user) => {
  return (dispatch) => {
    dispatch({ type: SET_USER, payload: user });
  };
};

export const logoutUser = () => ({
  type: LOGOUT_USER,
});

export const getFilterByDiets = (comida) => {
  return {
    type: FILTER_BY_DIETS,
    payload: comida,
  };
};

export const getFilterByMenu = (comida) => {
  return {
    type: FILTER_BY_MENU,
    payload: comida,
  };
};
export const getFilterActive = (active) => {
  return {
    type: FILTER_BY_ACTIVE,
    payload: active,
  };
};

export const findDetailRestaurant = (id) => {
  return (dispatch) => {
    axios
      .get(`/restaurant/${id}`)
      .then((result) => {
        dispatch({
          type: DETAIL_RESTAURANT,
          payload: result.data,
        });
      })
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
  return (dispatch) => {
    axios
      .put(`/restaurant/${dataToUpdate.id}`, restaurant)
      .then((result) => {
        dispatch({
          type: MODIFY_RESTAURANT,
          payload: result,
        });
      })
      .catch((error) => {
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
      let RestauranByName = await axios.get(`/restaurant?name=${name}`);
      return dispatch({
        type: GET_RESTAURAN_NAME,
        payload: RestauranByName.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteRestaurant = (dataToUpdate) => {
  return (dispatch) => {
    axios
      .put(`/restaurant/${dataToUpdate.id}`, {
        active: dataToUpdate.active,
      })
      .then((response) => {
        dispatch({ type: DELETE_RESTAURANT, payload: response.data });
        dispatch(getAllRestaurants());
      })
      .catch((error) => {
        return dispatch({
          type: DELETE_RESTAURANT,
          payload: error,
        });
      });
  };
};

export const postRestaurant = (create) => async (dispatch) => {
  try {
    const response = await axios.post(`/restaurant`, create);
    const restaurant = response.data;
    console.log({ restaurant });
    dispatch({
      type: "POST_RESTAURANT",
      payload: restaurant,
    });
  } catch (error) {
    alert(error.message.data);
    dispatch({
      type: "POST_RESTAURANT",
      payload: [],
    });
  }
};

export const orderByName = (order) => {
  return { type: ORDER_BY_NAME, payload: order };
};
export const setToken = (token) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/users", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch({ type: SET_USER, payload: response.data });
    } catch (error) {
      console.error("Error setting token:", error);
    }
  };
};

export const orderByPopularity = (order) => {
  return { type: ORDER_BY_POPULARITY, payload: order };
};
export const getAllUsers = () => {
  return (dispatch) => {
    axios
      .get(`/users`)
      .then((response) => {
        dispatch({
          type: GET_ALL_USERS,
          payload: response.data,
        });
      })
      .catch((error) => {
        return dispatch({ type: GET_ALL_USERS, payload: error });
      });
  };
};

export const postUsers = (create) => async (dispatch) => {
  try {
    const users = await axios.post(`/users`, create);
    const userdata = users.data;
    console.log(userdata);
    dispatch({
      type: POST_USERS,
      payload: userdata,
    });
  } catch (error) {
    alert(error.response.data);
    dispatch({
      type: POST_USERS,
      payload: [],
    });
  }
};

export const getAllRestaurantsByUser = (user) => {
  console.log(user);
  return {
    type: GET_ALL_RESTAURANTS_BY_USER,
    payload: user,
  };
};
