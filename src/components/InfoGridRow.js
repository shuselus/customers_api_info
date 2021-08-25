import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isNotEmptyObject, capitalize } from "../utils/common";
import {nanoid} from "nanoid";
import RowItem from './RowItem';


const InfoGridRow = ({data, type}) => {
    const [row, setRow] = useState(data);
    console.log("InfoGridRow>>>>", data, type);
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
    }
    return (
        <>
         <RowItem data={data}/>
        </>
    )
}

export default memo(InfoGridRow)
