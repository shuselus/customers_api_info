import React, { useState, useEffect, useCallback, memo } from "react";
//import { useSelector, useDispatch } from "react-redux";
//import { isNotEmptyObject, capitalize } from "../utils/common";
import {nanoid} from "nanoid";
//import RowsManager from './RowsManager';
import RowItem from './RowItem';

const InfoGrid = ({dataMap}) => {
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    
    console.log("InfoGrid>>>>>data ", dataMap);

    useEffect(() => {
        if(dataMap.size){
           updateColumns(dataMap);
           updateRows(dataMap);
        }
    },[dataMap]);

    const updateColumns = (dataMap) => {
       //console.log("updateColumns>>>",dataMap);
         
       for(const [,value] of dataMap) {
         if(Array.isArray(value) && value.length > 0){
            setColumns(()=> Object.keys(value[0]).map(name =>
                ({id: nanoid(), name: name.toUpperCase()})));
            break;
         }
       }

    }

    const updateRows = (dataMap) => {      
         //setRows(new Map(dataMap));
        setRows(()=>{
            const arr = [];
            dataMap.forEach((value, key)=>{
                console.log(key ,":", value);
                    arr.push({id: nanoid(), name: key, value:value});
            })
            return arr;
        });
    }
    
    return (
        <div className="info-grid-container">
            {
            columns?.length &&
                <div className="row-grid">
                    {
                        columns.map((item) => 
                            <div key={item.id} className="column-cell">{item.name}</div>
                        )
                    }
                </div>
            }
            {
                rows.length &&
                    rows.map( item => 
                        <RowItem key={item.id} data={item}/> 
                )
            }
        </div>
    )
}
export default memo(InfoGrid);
