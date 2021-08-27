import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

const GridCell = ({data}) => {
    return (
        <div className="row-cell">
            {
                (data.name === "pii" || data.name === "masked") &&
                <div className={`pii-masked-cont ${data.name}-${data.value}`}>
                       {data.title}
                </div>

            }
            <div className={"row-cell"}>{data.value}</div>
        </div>
    )
}

export default GridCell
