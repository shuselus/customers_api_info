import { FILTERED_DATA } from '../actions/appActions';

  const filteredDataReducer = (state = [], action) => {
     const { data } = action;
     switch (action.type) {
        case FILTERED_DATA:
             return data;
        default:
           return state;
       }
 }
 
 export default filteredDataReducer