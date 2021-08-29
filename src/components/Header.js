import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { capitalizeByIndex } from "../utils/common";

// a. The method and path of the route
// b. “Breadcrumbs”: All APIs > {apiName} > {path} - non clickable.

const Header = () => {
  const [method, setMethod] = useState("");
  const [apiName, setApiName] = useState("");
  const [path, setPath] = useState("");

  const apiData = useSelector((state) => state.apiDataReducer);

  useEffect(() => {
    if (Object.entries(apiData).length > 0) {
      setApiName(apiData.api);
      const _method = apiData.method.toUpperCase();
      setMethod(_method);
      capitalizeByIndex(apiData.path, [1, 8]);
      const splited = apiData.path.split("/");
      splited[1].toUpperCase();
      splited[splited.length - 1] = splited[splited.length - 1].replace(/[\{\}']+/g,'');
      const _path = splited.join("/");
      setPath(_path);
    }
  }, [apiData]);

  return (
    <div className="header-container">
      <h3 className="header-h">
        <span className="header-method">{method + " "}</span>
        {path}
      </h3>
      <span className="header-method">
        All APIs {">"} {apiName} {">"} {path}
      </span>
    </div>
  );
};

export default Header;
