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
  const [tabs, setTabs] = useState([]);
  const apiData = useSelector((state) => state.apiDataReducer);
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // for (const key in apiData) {
    //   console.log("key: " + key, ", item: " + apiData[key]);
    // }
    if (isNotEmptyObject(apiData)) {
      const _tabs = Object.keys(apiData);
      _tabs.splice(0, 3);
      setTabs(() => _tabs.map((item) => ({ id: nanoid(), name: item, label: capitalizeByIndex(item, [0]) })));
      setIsLoading(false);
    }
  }, [apiData]);


  if(isLoading){
    return <FontAwesomeIcon icon={faSpinner} size="2x" color="#6d6d6f" spin />;
  }
  return (
    <div className="main-area">
          <NavBar tabs={tabs} />
          {
              <InfoGrid data={apiData}/>
          }
          
    </div>
  );
};

export default memo(MainArea);
