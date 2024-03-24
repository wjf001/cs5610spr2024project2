import { NavLink } from 'react-router-dom'
import './NavBar.css'
import Home from './Home.jsx'
import Gameoflife from './Gameoflife.jsx'
import Credit from './Credit.jsx'

function NavBar() {
    return (
        <div className="NavBarCon">
            <div><NavLink to="/" >Home Page</NavLink></div>
            <div><NavLink to="/Game">Game Page</NavLink></div>
            <div><NavLink to="/Credit">Credit Page</NavLink></div>
        </div>
    )
}

export default NavBar
