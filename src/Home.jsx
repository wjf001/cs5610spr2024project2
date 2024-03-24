import React from 'react';
import NavBar from './NavBar.jsx'
import './Home.css'
import { NavLink } from 'react-router-dom'

function Home() {
    return (
        <>
        <NavBar />

        <h1>Conway's Game of Life</h1>

        <div className="intro">
            <div> The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician 
                  John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by 
                  its initial state, requiring no further input. One interacts with the Game of Life by creating an initial 
                  configuration and observing how it evolves. It is Turing complete and can simulate a universal constructor 
                  or any other Turing machine.
            </div>
        </div>

        <div>
            <h2 className='instruction'>Rules of Game</h2>
            <ol className="rules">
                <li>A living cell with less than two living neighbours dies</li>
                <li>A living cell with two or three live neighbours lives</li>
                <li>A living cell with more than three live neighbours dies</li>
                <li>A dead cell with exactly three live neighbours becomes a live cell</li>
            </ol>
        </div>

        <div>
            <h2 className='instruction'>Instruction of the Website</h2>
            <ol className="rules">
                <li>Nav-Bar have three links to 3 different Pages: Home Page, Game Page, and Credit Page.</li>
                <li>You are in Home page now.</li>
                <li>Game page is for you to play Conway's Game of Life.</li>
                <li>Credit Page have link to the GitHub for you to review the code.</li>
            </ol>
        </div>

        </>
    )
}

export default Home