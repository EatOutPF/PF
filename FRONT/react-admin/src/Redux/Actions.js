import axios from "axios";

const baseUrl = "http://localhost:5001";

export const GET_ALL_RESTAURANTS = "GET_ALL_RESTAURANTS";
export const SET_USER = "SET_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const MODIFY_RESTAURANT = "MODIFY_RESTAURANT";
export const DETAIL_RESTAURANT = "DETAIL_RESTAURANT";
export const FILTER_BY_DIETS= "FILTER_BY_DIETS"

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


export const getFilterByDiets=(comida) =>{
 
  return {
    type: FILTER_BY_DIETS,
    payload: comida,
  };
}
export const findDetailRestaurant = (id) => {
  return async (dispatch) => {
    return await axios
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
  return async (dispatch) => {
    await fetch(`${baseUrl}/restaurant/${dataToUpdate._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "aplication/json",
      },
      body: JSON.stringify(dataToUpdate),
    })
      .then((response) => response.json())
      .then((result) => {
        dispatch({
          type: MODIFY_RESTAURANT,
          payload: { dataToUpdate, result },
        });
      })
      .catch((error) => {
        return dispatch({
          type: MODIFY_RESTAURANT,
          payload: error.response.data,
        });
      });
  };
};
