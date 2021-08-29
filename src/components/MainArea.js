import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { currentSectionData as sectionData } from "../actions/appActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";
import { capitalizeByIndex } from "../utils/common";
import { nanoid } from "nanoid";
import SearchBar from "./SearchBar";
import InfoGrid from "./InfoGrid";

const MainArea = () => {
  const apiData = useSelector(state => state.apiDataReducer);
  const currentSectionData = useSelector(state => state.currentSectionDataReducer);
  const [sectionName, setSectionName] = useState("")
  const [tabs, setTabs] = useState([]);
  const [apiDataMap, setApiDataMap] = useState(new Map());
  const [sectionMap, setSectionMap] = useState(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.entries(apiData).length > 0) {
      setApiDataMap(new Map(Object.entries(apiData)));
    }
  }, [apiData]);

  useEffect(()=>{
    const _tabs = [...apiDataMap.keys()];
    _tabs.splice(0, 3);
    setTabs(() => _tabs.map((item) => ({ id: nanoid(), name: item, label: capitalizeByIndex(item, [0]) })));
    setIsLoading(false);
  },[apiDataMap]);

  useEffect(()=>{
    console.log("MainData>>>>>by sectionName>>>>>", sectionName);
    if(sectionName && apiDataMap.size){
       updateCurrentSectionData(sectionName);
    }
  },[sectionName, apiDataMap]);

  useEffect(()=>{
    const dataMap = new Map(Object.entries(currentSectionData))
    setSectionMap(dataMap);
  },[currentSectionData])

  const updateCurrentSectionData = (sectionName) =>{
    const obj = apiDataMap.get(sectionName);
    dispatch(sectionData(obj));
  }
  
  const updateSectionName = useCallback((value) => {
    setSectionName(value);
  },[sectionName])

  if(isLoading){
    return <FontAwesomeIcon icon={faSpinner} size="2x" color="#6d6d6f" spin />;
  }
  return (
    <div className="main-area">
      
          {
            tabs?.length &&
            <NavBar tabs={tabs} updateSectionName={updateSectionName} />
          }
      <div className="main-wrapper">
          {
            apiDataMap.size > 0 && sectionName &&
            <SearchBar sectionName={sectionName}/>
          }
          { 
             sectionMap.size > 0 &&
              <InfoGrid dataMap={sectionMap}/>
          }
      </div>   
    </div>
  );
};

export default memo(MainArea);
