import React, { useState, useEffect } from "react";

const GridCell = ({data, updateData}) => {
    const [value, setValue] = useState(data.value);

    useEffect(()=>{
        setValue(data.value);
    },[data])

    const onClickHandler = () => {
        setValue((prev)=>{
            const obj = {...data};
            obj.value = !prev;
            updateData(obj);
            return !prev;
        })
        
    }

    return (
        <div className={`row-cell ${data.name === "type"? "justify-ctr" : ""}`}>
            {
                data.name !== "name" 
                ?
                <div className={`pii-masked-cont ${data.name}${data.name !== "type" ? "-"+value : ""}`} onClick={onClickHandler}>
                       {data.name !== "type" ? data.title : value}
                </div>
                :
                <div className={"name"}>{value}</div>

            }
            
        </div>
    )
}

export default GridCell
