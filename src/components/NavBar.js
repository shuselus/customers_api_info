import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sectionName } from '../actions/appActions';
//import PropTypes from "prop-types";
import NavTab from './NavTab';
//import { capitalizeByIndex } from "../utils/common";

const NavBar = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);
  const dispatch = useDispatch();
  console.log("NavBar>>>", tabs);

  useEffect(() => {
    if(activeTab){
        dispatch(sectionName(activeTab));
    }
  },[activeTab])

  const tabAction = useCallback((tabName) => {
        console.log("tabAction>>>", tabName);
        setActiveTab(tabName);
  },[activeTab])

  return (
    <div className="navbar-container white-bgr-clr shadow-bottom">
      {tabs?.length &&
        tabs.map((tab) => {
            console.log("isActive",(activeTab === tab.name));
            return <NavTab
                key={tab.id}
                data={tab}
                tabAction={tabAction}
                isActive={(activeTab === tab.name)}
            />
        }
         
        )}
    </div>
  );
};

export default memo(NavBar);
