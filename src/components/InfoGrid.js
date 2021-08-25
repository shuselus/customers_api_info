import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isNotEmptyObject, capitalize } from "../utils/common";
import {nanoid} from "nanoid";
import InfoGridRow from './InfoGridRow';

const InfoGrid = ({data}) => {
    const [currentSectionData, setCurrentSectionData] = useState({});
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const { sectionName } = useSelector((state) => state.appDataReducer);
    console.log("InfoGrid>>>>>data ",data);

    useEffect(()=>{
        console.log("InfoGrid>>>>>by sectionName>>>>>", sectionName , data[sectionName]);
      if(sectionName){
          setCurrentSectionData(data[sectionName]);
      }
    },[sectionName]);

    useEffect(() => {
        if(isNotEmptyObject(currentSectionData)){
           updateColumns(currentSectionData);
           updateRows(currentSectionData);
        }
        
    },[currentSectionData]);

    const updateColumns = (dataObj) => {
        for (const key in dataObj){
            if (Array.isArray(dataObj[key]) && dataObj[key].length){
                setColumns(()=> 
                Object.keys(dataObj[key][0]).map(name =>
                     ({id: nanoid(), name: name.toUpperCase(), type: "column"})) );
                break;
            }
        }
    }

    const updateRows = (dataObj) => {
        const _rows = [];
        for(const key in dataObj){
            _rows.push({id: nanoid(), name: key, value : dataObj[key], tipe: "row"});
        }
        setRows(_rows);
    }
    
    return (
        <div className="info-grid-container">
              {
                <InfoGridRow data={columns} type="columns"/>
              }
              {
                 rows?.length && 
                 rows.map(item => 
                 <InfoGridRow  key={item.id} data={item} type="row"/>)
              }
        </div>
    )
}
export default memo(InfoGrid);
