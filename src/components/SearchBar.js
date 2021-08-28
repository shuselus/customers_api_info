import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({apiDataMap, updateCurrentSectionMap, sectionName}) => {
  const [inputValue, setInputValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [currentSectionMap, setCurrentSectionMap] = useState(new Map());
  //const dispatch = useDispatch();
  useEffect(()=>{
      const obj = apiDataMap.get(sectionName);
      setCurrentSectionMap(new Map(Object.entries(obj)));
  },[apiDataMap]);

  useEffect(()=>{
      setBtnDisabled(inputValue === "")
  },[inputValue]);

  const onChangeHandle = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
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
    const searchRes = {searchValue: inputValue, pii: checked }
    //const apiDataMap = new Map(Object.entries(apiData));
    let inputValueKey = "";
    for(const [key, value]  of currentSectionMap){
      console.log("onSearchApply>>>>", test(key, inputValue))
      if(test(key, inputValue))
          inputValueKey = key;

         // break;
         //  if(key.toLowerCase() === inputValue.toLowerCase()){
         //    inputValueKey = key;
         //    break;
         //  }
    }
    if(inputValueKey !== ""){
      const newMap = new Map(currentSectionMap)
      const _keys = [...newMap.keys()];
      _keys.forEach(key => key !== inputValueKey && newMap.delete(key));
      updateCurrentSectionMap(newMap)
    }else{
      setInputValue("");
    }
  }
  
  const onResetFilter = () => {
    updateCurrentSectionMap(currentSectionMap);
    setInputValue("");
    setChecked(false);
  }

  return (
    <div className="search-bar-container">
      <div className="serach-panel panel-shadow">
        <FontAwesomeIcon icon={faSearch} color="#707070" size="1x"/>
        <input className="search-field" type="text" onChange={onChangeHandle} value={inputValue} placeholder="Search"/>
        <label>Show PII only</label>
        <input type="checkbox" onChange={onChangeCheckboxState} checked={checked}/>
        <button className="search-apply-btn" disabled={btnDisabled} onClick={onApplySearchRes}>Apply</button>
      </div>
      <div className="reset-filter" onClick={onResetFilter}>Reset Filter</div>
    </div>
  )
  
};

export default SearchBar;
