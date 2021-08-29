import { CURRENT_SECTION_MAP } from "../actions/appActions";

const currentSectionMapReducer = (state = new Map(), action) => {
  const { data } = action;
  switch (action.type) {
    case CURRENT_SECTION_MAP:
      return new Map(data);
    default:
      return state;
  }
};

export default currentSectionMapReducer;
