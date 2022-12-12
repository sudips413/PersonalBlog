import React,{useContext, useEffect, useState} from 'react'
import { UserContext } from '../../contexts/Usercontext';


import logo  from '../image/me.jpg';
import axios from 'axios';


import './navbar.css'
import {Link} from 'react-router-dom'


export default function Header() {
    const [userdetail,setuserdetail]=useState([]);    
    const {user,setuser}= useContext(UserContext);
    const id = window.localStorage.getItem("id");
    useEffect(()=>{
        setuser(window.localStorage.getItem("user"));
        axios.get(`http://localhost:4000/api/user/${id}`)
        .then(res=>{
            setuserdetail(res.data.users);
        }
        )
        .catch(err=>{
            console.log(err);
        }
        )


    },[])
    
    
    
  return (
    <>
    <header>
        
        <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom shadow">
            <div className="container-fluid">
            {user? 
            (<a className="navbar-brand fw-bold d-flex" href="/setting">
                {userdetail.image?
                (<img src={`http://localhost:4000/${userdetail.image}`} style={{borderRadius:"50%", height:"50px"}} alt="logo" />):

                <img src={logo} alt="rex web media logo" width="50" height="50" class="me-1 rounded " />
 }
                <span className='blogtitle mt-3'>
                {user}
                </span>
            </a>):(
                <span className='blogtitle'>TELLUS</span>
            )}

            <button className="navbar-toggler shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{border:"none"}}>
            <span className="navbar-toggler-icon" ></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                {user?
                    (<><li className="nav-item">
                        <Link className='nav-link' to="/"><i class="fa fa-home">Home</i></Link>
                    </li>
                    <li className="nav-item">
                    <Link className='nav-link' to="/ideas"><i className='fa fa-edit' >Create</i></Link>
                    </li>
                    <li className="nav-item">
                    <Link className='nav-link' to="/setting"><i className='fa fa-cog'>Setting</i></Link>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href={{}} onClick={(e)=>{
                        e.preventDefault();
                        window.localStorage.removeItem("user");
                        setuser(null);
                        window.localStorage.removeItem("id");
                        window.location.href="/";
                    }}><i className='fa fa-sign-out'>Logout</i></a>
                    </li>
                    </>):(
                        <>
                        <li className="nav-item">
                        <Link className="nav-link" to="/login"><i className='fa fa-user'>Sign-in</i></Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/register"><i className='fa fa-user'>Sign-up</i></Link>
                        </li>
                        </>

                    )}
                
            </ul>
            </div>            
            </div>    
            
        </nav>
    
    </header>
    </>

  )
}
