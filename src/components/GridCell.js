import React, { useState, useEffect, useCallback, memo } from "react";

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
        <div className="row-cell">
            {
                (data.name === "pii" || data.name === "masked") &&
                <div className={`pii-masked-cont ${data.name}-${value}`} onClick={onClickHandler}>
                       {data.title}
                </div>

            }
            <div className={"row-cell"}>{value}</div>
        </div>
    )
}

export default GridCell
