import { combineReducers } from 'redux';
import apiDataReducer from './apiDataReducer';
import appDataReducer from './appDataReducer';
import currentSectionDataReducer from './currentSectionDataReducer';
import currentSectionMapReducer from './currentSectionMapReducer';





const rootReducer = combineReducers({
    apiDataReducer: apiDataReducer,
    currentSectionDataReducer: currentSectionDataReducer,
    currentSectionMapReducer: currentSectionMapReducer,
});

export default rootReducer;