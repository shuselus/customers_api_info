import { SELECTED_ITEMS, ADD_SELECTED_ITEM, REMOVE_SELECTED_ITEM } from '../actions/appActions';

  // const initialState = {
  //    items: []
   //}

   
  const selectedItemsReducer = (state = [], action) => {
     switch (action.type) {
         case SELECTED_ITEMS:
            return action.items;
         case ADD_SELECTED_ITEM:
            const selected = [...state, action.item];
            const selectedUnic = [...new Set(selected)];
            const sortedById = selectedUnic.sort((a,b)=> a.id - b.id)
            return sortedById;
         case REMOVE_SELECTED_ITEM:
            return state.filter(({id}) => id !== action.id);
         default:
            return state;
      }
 }
 
 export default selectedItemsReducer