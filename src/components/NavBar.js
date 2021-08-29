import React, { useState, useEffect, useCallback, memo } from 'react';
import NavTab from './NavTab';

const NavBar = ({ tabs, updateSectionName }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].name);

  useEffect(() => {
    if(activeTab){
        updateSectionName(activeTab);
    }
  },[activeTab])

  const tabAction = useCallback((tabName) => {
        setActiveTab(tabName);
  },[activeTab])

  return (
    <div className="navbar-container white-bgr-clr shadow-bottom">
      {tabs?.length &&
        tabs.map((tab) => {
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
