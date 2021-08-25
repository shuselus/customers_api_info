import { API_DATA } from "../actions/appActions";

const apiDataReducer = (state = {}, action) => {
  const { data } = action;
  switch (action.type) {
    case API_DATA:
      //return {...state, list: action.list} ;
      return data;
    default:
      return state;
  }
};

export default apiDataReducer;
