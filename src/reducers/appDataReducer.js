import { SECTION_NAME, CURRENT_SECTION_MAP } from "../actions/appActions";
const initialState = {
  sectionName: "",
  currentSectionMap: new Map()
}

const appDataReducer = (state = initialState , action) => {
  switch (action.type) {
    case SECTION_NAME:
      return {...state, sectionName: action.name};
    case CURRENT_SECTION_MAP:
        return {...state, currentSectionMap: new Map(action.data)};
    default:
      return state;
  }
};

export default appDataReducer;
