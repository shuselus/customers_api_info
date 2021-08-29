import React from "react";

const NavTab = ({ data, tabAction, isActive = false }) => {

  return (
    <div className="tab-button" onClick={() => tabAction(data.name)}>
      <span className={isActive ? "vlt-clr" : ""}>{data.label}</span>
      <div className={`tab-act-uline ${isActive ? "vlt-bgr-clr" : ""}`}></div>
    </div>
  );
};

export default NavTab;
