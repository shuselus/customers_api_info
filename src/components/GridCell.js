import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

const GridCell = ({data, updateData}) => {
    const [innerData, setInnerData] = useState([...data]);
    const onClickHandler = () => {
        setInnerData(prev => {
            const obj = {...prev};
            obj.value = !obj.value;
            updateData(obj)
           return obj
        }
           );
    }

    return (
        <div className="row-cell">
            {
                (innerData.name === "pii" || innerData.name === "masked") &&
                <div className={`pii-masked-cont ${innerData.name}-${innerData.value}`} onClick={onClickHandler}>
                       {innerData.title}
                </div>

            }
            <div className={"row-cell"}>{data.value}</div>
        </div>
    )
}

export default GridCell
