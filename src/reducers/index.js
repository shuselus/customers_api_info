import { combineReducers } from 'redux';
import apiDataReducer from './apiDataReducer';
import currentSectionDataReducer from './currentSectionDataReducer';


const rootReducer = combineReducers({
    apiDataReducer: apiDataReducer,
    currentSectionDataReducer: currentSectionDataReducer,
});

export default rootReducer;