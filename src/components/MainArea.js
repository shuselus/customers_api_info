import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import NavBar from "./NavBar";
import { isNotEmptyObject, capitalizeByIndex } from "../utils/common";
import { nanoid } from "nanoid";
import SearchBar from "./SearchBar";
import InfoGrid from "./InfoGrid";

const MainArea = () => {
  const apiData = useSelector(state => state.apiDataReducer);
  const [tabs, setTabs] = useState([]);
  const [apiDataMap, setApiDataMap] = useState(new Map());
  const [currentSectionMap, setCurrentSectionMap] = useState(new Map());
  const { sectionName } = useSelector(state => state.appDataReducer);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isNotEmptyObject(apiData)) {
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

  const updateCurrentSectionData = (sectionName) =>{
    const obj = apiDataMap.get(sectionName);
    setCurrentSectionMap(new Map(Object.entries(obj)));
  }
  const sectionDataBySearchRes = (dataMap) => {
    setCurrentSectionMap(new Map(dataMap));
  }
  if(isLoading){
    return <FontAwesomeIcon icon={faSpinner} size="2x" color="#6d6d6f" spin />;
  }
  return (
    <div className="main-area">
      
          {
            tabs?.length &&
            <NavBar tabs={tabs} />
          }
      <div className="main-wrapper">
          {
            apiDataMap.size && sectionName &&
            <SearchBar apiDataMap={apiDataMap} updateCurrentSectionMap={sectionDataBySearchRes} sectionName={sectionName}/>
          }
          { 
             currentSectionMap.size &&
              <InfoGrid dataMap={currentSectionMap}/>
          }
      </div>   
    </div>
  );
};

export default memo(MainArea);
