import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import './Gameoflife.css';
import HeatMap from './HeatMap';
import './HeatMap.css';
import NavBar from './NavBar';

export default function Gameoflife(){
    const [height, setHeight] = useState(20);
    const [width, setWidth] = useState(20);
    const [gridError, setGridError] = useState("");
    const [countCell, setCountCell] = useState(0);
    const [heatMap, setHeatMap] = useState(false);
    const [grid, setGrid] = useState(function() {
        return createGrid(height, width);
    });

    function changeHeight(event) {
        setHeight(event.target.value);
    }
    
    function changeWidth(event) {
        setWidth(event.target.value);
    }
    
    useEffect(() => {
        const initialGrid = createGrid(20, 20);
        setGrid(initialGrid);
    }, []);

    useEffect(() => {
        const count = grid.flat().filter(cell => cell.isAlive).length;
        setCountCell(count);
    }, [grid]);

    function createGrid(rows, cols) {
        const grid = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                let randNum = Math.random();
                let cell = { isAlive: false, deadIter: 1 };
    
                if (randNum < 0.05) {
                    cell.isAlive = true;
                    cell.deadIter = 0;
                }
                row.push(cell);
            }
            grid.push(row);
        }
        return grid;
    }
    
    function changeGridSize() {
        if (height >= 3 && height <= 40 && width >= 3 && width <= 40) {
            setGrid(createGrid(height, width));
            setGridError("");
        } else {
            setGridError("The range of height and width should be 3 - 40.");
        }
    }
    
    function changeToHeatmap() {
        setHeatMap(!heatMap);
    }
    
    function resetGrid() {
        setGrid(createGrid(height, width));
    }
    
    function selectCell(rowIndex, cellIndex) {
        let newGrid = [];
        for (let i = 0; i < grid.length; i++) {
            newGrid[i] = [];
            for (let j = 0; j < grid[i].length; j++) {
                if (i === rowIndex && j === cellIndex) {
                    newGrid[i][j] = Object.assign({}, grid[i][j], {isAlive: !grid[i][j].isAlive});
                } else {
                    newGrid[i][j] = Object.assign({}, grid[i][j]);
                }
            }
        }
        setGrid(newGrid);
    }
    
    function nextGrid(currentGrid) {
        let nextGridChange = [];
        for (let i = 0; i < currentGrid.length; i++) {
            nextGridChange[i] = [];
            for (let j = 0; j < currentGrid[i].length; j++) {
                nextGridChange[i][j] = {
                    isAlive: currentGrid[i][j].isAlive,
                    deadIter: currentGrid[i][j].deadIter
                };
            }
        }
    
        for (let y = 0; y < currentGrid.length; y++) {
            for (let x = 0; x < currentGrid[y].length; x++) {
                let liveCell = countLiveCell(currentGrid, x, y);
    
                if (currentGrid[y][x].isAlive) {
                    if (liveCell < 2 || liveCell > 3) {
                        nextGridChange[y][x].isAlive = false;
                        nextGridChange[y][x].deadIter = 1;
                    }
                } else {
                    if (liveCell === 3) {
                        nextGridChange[y][x].isAlive = true;
                        nextGridChange[y][x].deadIter = 0;
                    } else {
                        nextGridChange[y][x].deadIter += 1;
                    }
                }
            }
        }
    
        return nextGridChange;
    }
    
    function countLiveCell(grid, x, y) {
        let cellCount = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (!(i === 0 && j === 0)) {
                    let newX = x + j;
                    let newY = y + i;
                    if (newX >= 0 && newX < grid[0].length && newY >= 0 && newY < grid.length && grid[newY][newX].isAlive) {
                        cellCount++;
                    }
                }
            }
        }
        return cellCount;
    }
    
    function playGame() {
        const nextGridChange = nextGrid(grid);
        setGrid(nextGridChange);
    }




    return(
        <>
        <h1>Conway's Game of Life</h1>
        <NavBar />

        <div className="main_game_page">
            <div className="live_cell_count">
                <h3>Current Living Cells:</h3>
                <h3>{countCell}</h3>
            </div>

            <div className="input">
                <div>
                    <label for="height">Height (3 - 40):</label>
                    <input type='number' id='height' value={height} onChange={changeHeight} placeholder='Range from 3 - 40'></input>
                </div>

                <div>
                    <label for="width">Width (3 - 40):</label>
                    <input type='number' id='width' value={width} onChange={changeWidth} placeholder='Range from 3 - 40'></input>
                </div>

                <div>
                    <button onClick={changeGridSize}>Change Grid Size</button>
                </div>
            </div>

            <div className="error">
                {gridError && <div>{gridError}</div>}
            </div>

        <div class="game_control">
            <button onClick={resetGrid}>Reset Game</button>
            <button onClick={playGame}>Play Game</button>
        </div>

            <div className='grid_container'>
                {grid.map((row, rowIndex) => (
                        <div key={rowIndex} className="grid_row">
                            {row.map((cell, cellIndex) => (
                                <HeatMap
                                    key={`${rowIndex}-${cellIndex}`} 
                                    isAlive={cell.isAlive} 
                                    deadIterations={cell.deadIter} 
                                    clickCell={() => selectCell(rowIndex, cellIndex)} 
                                    heatMapMode={heatMap}
                                />
                            ))}
                        </div>
                    ))} 
            </div>

                <div className='heatmap'>
                    <button 
                        className={`heatmap_switch ${heatMap ? 'heatmap_switch_on' : 'heatmap_switch_off'}`} 
                        onClick={changeToHeatmap}
                    >Heat Map Switch</button>
                </div>
        </div>

        </>
    )

}