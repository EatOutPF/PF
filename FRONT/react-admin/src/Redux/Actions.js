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
export const GET_ALL_USERS = "GET_ALL_USERS";
export const POST_USERS = "POST_USERS";
export const GET_ALL_RESTAURANTS_BY_USER = "GET_ALL_RESTAURANTS_BY_USER";
export const FILTERS_OPTIONS = "FILTERS_OPTIONS";
export const SORT_BY_RESTAURANT_BY_USER = "SORT_BY_RESTAURANT_BY_USER";
export const SORT_BY_POPULARITY_BY_RESTAURANT_USER =
  "SORT_BY_POPULARITY_BY_RESTAURANT_USER";
export const DELETE_USER = "DELETE_USER";

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

export const getFilterOptions = ({ diets, menu, active }) => {
  return {
    type: FILTERS_OPTIONS,
    payload: { diets, menu, active },
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

export const deleteUser = (user) => {
  return (dispatch) => {
    axios
      .put(`/users/${user.id}`, {
        active: user.active,
      })
      .then((response) => {
        dispatch({
          type: DELETE_USER,
          payload: response.data,
        });
        dispatch(getAllUsers());
      })
      .catch((error) => {
        return dispatch({
          type: DELETE_USER,
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
    alert(restaurant);
    dispatch({
      type: "POST_RESTAURANT",
      payload: restaurant,
    });
    dispatch(getAllRestaurantsByUser());
  } catch (error) {
    alert(error.response.data.error);

    dispatch({
      type: "POST_RESTAURANT",
      payload: error.response.data.error,
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

export const sortByRestaurantByUser = (order) => {
  return {
    type: SORT_BY_RESTAURANT_BY_USER,
    payload: order,
  };
};

export const sortByRestaurantByPopularityByUser = (order) => {
  return {
    type: SORT_BY_POPULARITY_BY_RESTAURANT_USER,
    payload: order,
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
  return {
    type: GET_ALL_RESTAURANTS_BY_USER,
    payload: user,
  };
};
