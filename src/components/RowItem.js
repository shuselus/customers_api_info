import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import GridCell from './GridCell';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { updateCurrentSectionMap } from '../actions/appActions'
import { nanoid } from "nanoid";

const RowItem = ({data}) => {
    const [expand, setExpand] = useState(true);
    const [btnIsDisabled, setBtnIsDesabled] = useState(true)
    const [innerRows, setInnerRows] = useState([]);
    const dispatch = useDispatch();

    useEffect(() =>{
        if(Array.isArray(data.value) && data.value.length > 0){
            const dataMap = new Map(Object.entries(data.value));
            //console.log("dataMap>>>>",dataMap)
            setInnerRows(()=>{
                
                const arr = []
                dataMap.forEach((value, key)=>{
                    const innerArr = []
                    for(const key in value){
                        innerArr.push({id: nanoid(), name: key, title: key.toUpperCase(), value:value[key]});
                    }
                    arr.push(innerArr);
                });
                return arr
            });
            setBtnIsDesabled(false);
        }
        
    },[data])
 
    const expandRow = () =>{
        setExpand(prev => !prev)
    }

    const updateRowData = useCallback((cellData) => {
        if(cellData){
            const dataToUpdate = {name: data.name, subName: cellData.name, value: cellData.value};
            dispatch(updateCurrentSectionMap(dataToUpdate));
        }
    },[data]);

    const separateStringByCapitalLetter = (str) => {
        const reg= /(?=[A-Z])/;
        const strArr = str.split(reg);
        const resArr = strArr.map(str => {
            let strTmp = "";
            if(str === "url"){
              strTmp = str.toUpperCase(); 
            } else {
               let strArr =  str.split("");
               strArr[0] = strArr[0].toUpperCase();
               strTmp = strArr.join("");
            }  
           
            return strTmp;
        })
        return resArr.join(" ");
    }
    const getTitle = () => {
       return separateStringByCapitalLetter(data.name);
    }

    return (
        <div className="row-main-item">
            <div className="main-item-box" onClick={expandRow}>
                <div className="expand-btn"  disabled={btnIsDisabled} >
                   <FontAwesomeIcon icon={faCaretRight} color="#7b1fa2" size="xs" rotation={expand ? 90 : 0} />
                </div>
                <span className="row-item-txt-clr">{getTitle()}</span>
            </div>
           
            {
                expand && data.value.length > 0 &&
                      
                          
                              innerRows.map((item, index) => 
                                <div key={nanoid()} className="row-grid panel-shadow row-grid-height mg-t">
                                    {
                                     item.map((row) => 
                                        <GridCell key={row.id} data={row} updateData={updateRowData}/>
                                      )
                                    }
                                </div> 
                              )
                          
                       
            } 
             
        </div>
    )
}

export default RowItem
