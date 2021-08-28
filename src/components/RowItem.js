import React, { useState, useEffect, useCallback, memo } from "react";
import GridCell from './GridCell';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

const RowItem = ({data}) => {
    const [expand, setExpand] = useState(false);
    const [btnIsDisabled, setBtnIsDesabled] = useState(true)
    const [innerRow, setInnerRow] = useState([]);
    //console.log("RowItem>>>>", Object.entries(data));
    useEffect(() =>{
        //[{"name": "category","pii": false,"masked": false,"type": "string"}]
        console.log("innerRow>>>", data.value);
        if(Array.isArray(data.value) && data.value.length){
            const dataMap = new Map(Object.entries(data.value[0]));
            //console.log("entries>>>",  dataMap);
            setInnerRow(()=>{
                const arr = []
                dataMap.forEach((value, key)=>{
                    console.log("typeof key>>>",  key, value);
                    arr.push({id: nanoid(), name: key, title: key.toUpperCase(), value:value})
                });
                return arr;
            });
            setBtnIsDesabled(false);
        }
        
    },[data])
 
    const expandRow = () =>{
        setExpand(prev => !prev)
    }

    return (
        <div className="row-main-item">
            <div className="main-item-box">
                <button className="expand-btn"  disabled={btnIsDisabled} onClick={expandRow}>
                   <FontAwesomeIcon icon={faCaretRight} color="#7b1fa2" size="xs" rotation={expand ? 90 : 0} />
                </button>
                <span className="row-item-txt-clr">{data.name}</span>
            </div>
           
            {
                expand && 
                      <div className="row-grid panel-shadow">
                          {
                              innerRow.map((item, i) => 
                                 <GridCell key={item.id} data={item}/>
                              )
                          }
                      </div>  
            } 
             
        </div>
    )
}

export default RowItem
