import {} from "./Actions";

const initialState = {
  allRestaurants: [],
};

const Reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    default:
      return { ...state };
  }
};

export default Reducer;
