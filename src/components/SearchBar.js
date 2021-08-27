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
},[apiDataMap])
useEffect(()=>{
    setBtnDisabled(inputValue === "")
},[inputValue])

  const onChangeHandle = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  }
  const onChangeCheckboxState = (e) => {
    e.preventDefault();
    setChecked(prev => !prev);
  }
  function test(arr, sub) {
    sub = sub.toLowerCase();
    return arr.map(str => str
      .toLowerCase()
      .startsWith(sub.slice(0, Math.max(str.length - 1, 1)))
    );
  }
  const onSearchApply = (e) => {
    e.preventDefault();
    const searchRes = {searchValue: inputValue, pii: checked }
    //const apiDataMap = new Map(Object.entries(apiData));
    let inputValueKey = "";
    for(const [key, value]  of currentSectionMap){
       if(key.toLowerCase() === inputValue.toLowerCase()){
         inputValueKey = key;
         break;
       }
    }
    if(inputValueKey !== ""){
      const newMap = new Map(currentSectionMap)
      const _keys = [...newMap.keys()];
      _keys.forEach(key => key !== inputValueKey && newMap.delete(key));
      updateCurrentSectionMap(newMap)
    }
    //dispatch();
  }

  return (
    <div className="search-bar-container">
      <div className="serach-panel">
        <FontAwesomeIcon icon={faSearch} color="#7b1fa2" size="sl"/>
        <input type="text" onChange={onChangeHandle} value={inputValue} placeholder="Search"/>
        <label>Show PII only</label>
        <input type="checkbox" onChange={onChangeCheckboxState} checked={checked}/>
        <button type="submit" disabled={btnDisabled} onClick={onSearchApply}>Apply</button>
      </div>
      <div className="reset">Reset Filter</div>
    </div>
  )
  
};

export default SearchBar;
