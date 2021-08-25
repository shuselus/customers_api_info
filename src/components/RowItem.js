import React, { useState, useEffect, useCallback, memo } from "react";
import GridCell from './GridCell';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";

const RowItem = ({data}) => {
    const [expand, setExpand] = useState(false);
    const [rowsData, setRowsData] = useState([]);
    //console.log("RowItem>>>>", Object.entries(data));
    useEffect(() =>{
        if(data?.length){
            // const _row = data.value;
            // const _apiData = {...data.value};
            // let jsonMap = JSON.stringify([...Object.entries(data.value)])
            // let myMap = new Map(data.value);
            // console.log("myMap>>>",Array.from(myMap.values()));
        }
    },[data])
 
    const expandRow = () =>{
        setExpand(prev => !prev)
    }

    return (
        <div className="row-main-item">
            <div className="main-item-box">
                <div className="expand-btn" onClick={expandRow}>
                   <FontAwesomeIcon icon={faCaretRight} color="#7b1fa2" size="xs" rotation={expand ? 90 : 0} />
                </div>
                <span className="row-item-txt-clr">{data.name}</span>
            </div>
           
            {
                expand && 
                   rowsData.map((item) => 
                      <div key={item.id} className="row-grid">
                          {
                             // item.map((cell, i) => 
                             //    <GridCell key={item.id + i} data={cell}/>
                             // )
                          }
                      </div>  
                  )
           
               
            } 
             
        </div>
    )
}

export default RowItem
