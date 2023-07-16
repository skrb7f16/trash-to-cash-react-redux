import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SetNavBar from '../../state/actionCreaters/NavBarSelectAction'
import { getAuth } from 'firebase/auth'
export default function Navbar() {
    const navSelect =useSelector(state=>state.NavBarSelectReducer)
    const dispatch=useDispatch()
    const user = useSelector(state=>state.UserReducer)
    
    return (
        <nav className="navbar navbar-expand-lg border-bottom border-bottom-dark" style={{backgroundColor:'#caf593'}} >
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    Trash To Cash
                </a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item" >
                            <Link className="nav-link" to="/" style={navSelect==="home"?active:inactive} onClick={()=>dispatch(SetNavBar("home"))}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item" >
                            <Link className="nav-link" to="/about" style={navSelect==="about"?active:inactive} onClick={()=>dispatch(SetNavBar("about"))}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/items" style={navSelect==="items"?active:inactive}  onClick={()=>dispatch(SetNavBar("items"))}>
                                Items
                            </Link>
                        </li>
                        <li className="nav-item">
                            {user===null?<Link className='nav-link' to='/auth' style={navSelect==="user"?active:inactive} onClick={()=>dispatch(SetNavBar("user"))}  >Connect</Link>:
                            <Link className="nav-link" to={"/user/"+user.displayName} style={navSelect==="user"?active:inactive} onClick={()=>dispatch(SetNavBar("user"))}>
                                {user!==null?user.displayName:'user'}
                            </Link>}
                            
                        </li>
                        
                    </ul>
                </div>
            </div>
        </nav>


    )
}

const active={
    color:"black"
}
const inactive={
    color:'grey'
}