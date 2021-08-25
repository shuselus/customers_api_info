import React, { useState, useEffect, useCallback, memo } from "react";
import { useSelector, useDispatch } from "react-redux";

const GridCell = ({data}) => {
    return (
        <div className="row-cell">
            {
            data.name
            }
        </div>
    )
}

export default GridCell
