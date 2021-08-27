import React, { useState, useEffect, useCallback, memo } from "react";
//import { useSelector, useDispatch } from "react-redux";
import { isNotEmptyObject, capitalizeByIndex } from "../utils/common";
import {nanoid} from "nanoid";
import RowItem from './RowItem';


const RowsManager = ({data, type}) => {
    const [rowsData, setRowsData] = useState([])
    console.log("InfoGridRow>>>>", data, type);


    useEffect(()=>{
        if(type === "rows"){
            const dataMap = new Map([...data]);
            setRowsData(()=>{
                const arr = []
                dataMap.forEach((value, key)=>{
                    console.log(key ,":", value);
                     arr.push({id: nanoid(), name: capitalizeByIndex(key,[0]), value:value})
                });
                return arr;
            });
        }
    },[data]);

    

    if(type === "columns"){
        return (
            <div className="row-grid">
                {
                   data?.length &&
                   data.map((item) => 
                     <div key={item.id} className="column-cell">{item.name}</div>
                  )
                }
            </div>
        ) 
    }else if(type === 'rows'){
        return (
            <>
                {
                    rowsData?.length &&
                    rowsData.map( item => 
                         <RowItem key={item.id} data={item}/> 
                    )
                    
                }
            </>
            )
    }
    
}

export default memo(RowsManager)
