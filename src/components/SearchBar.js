import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentSectionData } from "../actions/appActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({sectionName}) => {
  const sectionData = useSelector(state => state.currentSectionDataReducer);
  const apiData = useSelector(state => state.apiDataReducer);
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [currentSectionMap, setCurrentSectionMap] = useState(new Map());
  const [warninMsg, setWarninMsg] = useState("");
  const dispatch = useDispatch();

  useEffect(()=>{
      setCurrentSectionMap(new Map(Object.entries(sectionData)));
  },[sectionData]);

  useEffect(()=>{
      setBtnDisabled(inputValue === "")
  },[inputValue]);

  const onChangeHandle = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
    setWarninMsg("")
  }

  const onChangeCheckboxState = (e) => {
    setChecked(prev => !prev);
    setBtnDisabled(false);
  }

  const test = (str, sub) => {
    const _str = str.toLowerCase();
    const _sub = sub.toLowerCase();
    return  _str.toLowerCase().startsWith(_sub.slice(0, Math.max(_str.length - 1, 1)))
  }

  const onApplySearchRes = (e) => {
    e.preventDefault();
    
    let obj = {}
    let arr = []
    let types = []
    let _currentSectionMap  = new Map(currentSectionMap);
    
    //////////FILTER BY CHECKBOX//////////////////////////
    for(const [key, value]  of _currentSectionMap){
      const _values = value.filter(item => item.pii === checked);
      //get all types from the rows
      value.forEach(item => types.push(item.type));

      if(_values.length){
        obj[key] = _values;
      }
    }
    
    if(Object.entries(obj).length > 0){
      dispatch(currentSectionData(obj));
      _currentSectionMap = new Map(Object.entries(obj));
    }else{
      setWarninMsg(`There is no matches was found`);
    }
    types = [...new Set(types)];// get unic values
    if(inputValue !== ""){

      ////////////SEARCH BY PARAMETR TYPE///////////////////////////

      let typeStr = ""
      if(types.length && types.includes(inputValue)){
        typeStr = types.filter(item => item === inputValue)[0];
        obj = {}

        for(const [key, value]  of _currentSectionMap){
          const _values = value.filter(item => item.type === typeStr);       
          if(_values.length){
            obj[key] = _values;
          } 
        }
        if(Object.entries(obj).length > 0){
          dispatch(currentSectionData(obj));
        }else{
          setWarninMsg(`There is no matches was found`);
        }
        
      }else{

         //////////SEARCH BY FIELD NAME///////////////////////////////////

        let inputValueKey = "";
        for(const [key, value]  of _currentSectionMap){
          if(test(key, inputValue)) inputValueKey = key;
        }
        if(inputValueKey !== ""){
          obj = {[inputValueKey] : _currentSectionMap.get(inputValueKey)};

          dispatch(currentSectionData(obj));          
        }else{
          setWarninMsg(`input valid search term - (for example: ${[..._currentSectionMap.keys()].toString().split(",").join(", ")} or types: ${types.toString().split(",").join(", ")})`)
        }


      }
    }
    setInputValue("");
  }
  
  const onResetFilter = () => {
    dispatch(currentSectionData(apiData[sectionName]));
    setInputValue("");
    setChecked(false);
  }

  return (
    <div className="search-bar-container">
      {
        warninMsg &&
        <div className = "search-warning-msg">{warninMsg}</div>
      }
      <div className="serach-panel panel-shadow">
        <div className="input-search-cont">
           <FontAwesomeIcon icon={faSearch} color="#707070" size="1x"/>
           <input className="search-field" type="text" onChange={onChangeHandle} value={inputValue} placeholder="Search"/>
        </div>
        <div className="checkbox-cont">
          <input type="checkbox" onChange={onChangeCheckboxState} checked={checked}/>
          <label>Show PII only</label>
        </div>
        
        <button className="search-apply-btn" disabled={btnDisabled} onClick={onApplySearchRes}>Apply</button>
      </div>
      <div className="reset-filter" onClick={onResetFilter}>Reset Filter</div>
    </div>
  )
  
};

export default SearchBar;
