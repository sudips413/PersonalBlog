import React ,{useContext}from 'react'
import { UserContext } from '../../contexts/Usercontext';
import Posts from '../Posts/Posts';
export default function About() {
    const {user,setuser}= useContext(UserContext);
  return (
    <>
      <div className="container mt-5">
        <div className="row">
            <div className="col-md-12 text-center">
              <img src="https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png" style={{width:"20%"}} alt="logo" /> 
             </div>
        </div>
      </div> 
      <Posts/>
      
        


    </>
  )
}
