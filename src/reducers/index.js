import { combineReducers } from 'redux';
import apiDataReducer from './apiDataReducer';
import appDataReducer from './appDataReducer';
//import selectedItemsReducer from './selectedItemsReducer';




const rootReducer = combineReducers({
    apiDataReducer: apiDataReducer,
    appDataReducer: appDataReducer
});

export default rootReducer;