import { SECTION_NAME } from "../actions/appActions";
const initialState = {
  sectionName: "",
  currentSectionData: {}
}

const appDataReducer = (state = initialState , action) => {
  switch (action.type) {
    case SECTION_NAME:
      return {...state, sectionName: action.name};
   // case CURRENT_SECTION_DATA:
    //    return {...state, currentSectionData: action.data};
    default:
      return state;
  }
};

export default appDataReducer;
