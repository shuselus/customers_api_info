import { CURRENT_SECTION_DATA } from "../actions/appActions";

const currentSectionDataReducer = (state = {}, action) => {
  const { data } = action;
  switch (action.type) {
    case CURRENT_SECTION_DATA:
      //return {...state, list: action.list} ;
      return data;
    default:
      return state;
  }
};

export default currentSectionDataReducer;
