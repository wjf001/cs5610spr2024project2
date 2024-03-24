import React from 'react';
import './HeatMap.css'

function HeatMap(props) {
    let maxIter = 10;
    let colorCount = props.deadIter / maxIter;
    let cellColor = 'Navy';

    if (colorCount <= 1 && colorCount > 0.75) {
        cellColor = 'Red';
    } else if (colorCount >= 0.75 && colorCount < 1) {
        cellColor = 'Yellow';
    } else if (colorCount >= 0.5 && colorCount < 0.75) {
        cellColor = 'Green';
    } else if (colorCount >= 0.25 && colorCount < 0.5) {
        cellColor = 'Blue';
    } else {
        cellColor = 'Navy';
    }

    let cellClass = 'cell';
    if (props.isAlive) {
        cellClass += ' alive';
    } else {
        cellClass += ' dead';
    }

    if (props.heatMap) {
        cellClass += ' ' + cellColor;
    } else {
        cellClass += ' off';
    }

    function handleClick() {
        if (props.clickCell) {
            props.clickCell();
        }
    }

    return <div className={cellClass} onClick={handleClick}></div>;
}

export default HeatMap;
