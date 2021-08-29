import React, { useState, useEffect, useCallback, memo } from "react";
import { useDispatch } from "react-redux";
import GridCell from './GridCell';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { updateCurrentSectionMap } from '../actions/appActions'
import { nanoid } from "nanoid";

const RowItem = ({data}) => {
    const [expand, setExpand] = useState(false);
    const [btnIsDisabled, setBtnIsDesabled] = useState(true)
    const [innerRow, setInnerRow] = useState([]);
    const dispatch = useDispatch();

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

    const updateRowData = useCallback((cellData) => {
        console.log("updateRowData>>>>",cellData)
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
                expand && 
                      <div className="row-grid panel-shadow">
                          {
                              innerRow.map((item) => 
                                 <GridCell key={item.id} data={item} updateData={updateRowData}/>
                              )
                          }
                      </div>  
            } 
             
        </div>
    )
}

export default RowItem
