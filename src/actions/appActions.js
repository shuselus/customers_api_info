import axios from "axios";

export const API_DATA = "API_DATA";
export const FILTERED_DATA = "FILTERED_DATA";
export const SECTION_NAME = "SECTION_NAME";
export const CURRENT_SECTION_MAP = "CURRENT_SECTION_MAP";
export const ERROR_ON_FETCH_API_DATA = "ERROR_ON_FETCH_API_DATA";

export const apiData = (data) => {
  return {
    type: API_DATA,
    data: data,
  };
};

export const filteredData = (data) => {
  return {
    type: FILTERED_DATA,
    data: data,
  };
};

export const sectionName = (name) => {
  return {
    type: SECTION_NAME,
    name: name,
  };
};

export const currentSectionMap = (data) => {
  return {
    type: CURRENT_SECTION_MAP,
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
  return function (dispatch) {
    return axios
      .get("./fe_data.json")
      .then(({ data }) => {
        console.log("fetchApiData>>>> ", data);
        dispatch(apiData(data));
      })
      .catch((error) => dispatch(errorOnFetchApiData(error)));
  };
};
