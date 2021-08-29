import axios from "axios";

export const API_DATA = "API_DATA";
export const CURRENT_SECTION_DATA = "CURRENT_SECTION_DATA";
export const ERROR_ON_FETCH_API_DATA = "ERROR_ON_FETCH_API_DATA";

export const apiData = (data) => {
  return {
    type: API_DATA,
    data: data,
  };
};

export const currentSectionData = (data) => {
  return {
    type: CURRENT_SECTION_DATA,
    data: data,
  };
};

export const errorOnFetchApiData = (error) => {
  return {
    type: ERROR_ON_FETCH_API_DATA,
    error: error,
  };
};

export const fetchApiData = () => {
  return  (dispatch) => {
    return axios
      .get("./fe_data.json")
      .then(({ data }) => {
        console.log("fetchApiData>>>> ", data);
        dispatch(apiData(data));
      })
      .catch((error) => dispatch(errorOnFetchApiData(error)));
  };
};

export const updateCurrentSectionMap = (changeData) => {
  return  (dispatch, getState) => {
    
    const data = getState().currentSectionDataReducer;
    if(data.hasOwnProperty(changeData.name)){
      let obj = data[changeData.name][0];
      for(const key in obj){
        if (key === changeData.subName){
          obj[key] = changeData.value;
        }
      }
      dispatch(currentSectionData(data));
    }     
  }
}