import React, { useState, useEffect, useCallback, memo } from "react";
//import { useSelector, useDispatch } from "react-redux";
import { isNotEmptyObject, capitalizeByIndex } from "../utils/common";
import {nanoid} from "nanoid";
import RowItem from './RowItem';


const RowsManager = ({dataMap}) => {
    const [rowsData, setRowsData] = useState([])
    


    useEffect(()=>{
        console.log("RowsManager>>>>", dataMap);
        if(dataMap?.size > 0){
            setRowsData(()=>{
                const arr = []
                dataMap.forEach((value, key)=>{
                    console.log(key ,":", value);
                        arr.push({id: nanoid(), name: key, value:value});
                });
                return arr;
            });
        }
    },[dataMap]);

    

   
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

export default memo(RowsManager)
