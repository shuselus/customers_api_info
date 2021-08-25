import { SECTION_NAME } from "../actions/appActions";
const initialState = {
  sectionName: ""
}

const appDataReducer = (state = initialState , action) => {
  switch (action.type) {
    case SECTION_NAME:
      return {...state, sectionName: action.name};
    default:
      return state;
  }
};

export default appDataReducer;
