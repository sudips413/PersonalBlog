import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import './register.css'


function Register() {
    const[username,setusername]= useState("");
    const[mail,setmail]=useState("");
    const[password, setpassword]=useState("");
    const navigate = useNavigate();
  return (
    
    <div className='container'>
        <div className='row'>
        <div className="logo text-center">
            <img src="https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png" alt="logo" style={{width:"40%"}} />
        </div>
        
      
        <form className="form col-12" onSubmit={async (e)=>{
            e.preventDefault();
            if(mail && password && username){
            await axios.post("http://localhost:4000/api/register",{
                name: username,
                email: mail,
                password: password

        
            })
            .then((res)=>{
                document.getElementById("error").innerHTML = res.data.message;
                navigate('/login')
            })
            .catch((err)=>{
                document.getElementById("error").innerHTML = err.response.data.message;
            }
            )

            }
            else
            {
                document.getElementById("error").innerHTML = "Password requires both upper and lower case letters, numbers or invalid email";
            }
        }}>
            <h2>SIGN UP</h2>
            <label className='label'>Username *</label>
            <input type='text' id="text" className='form-control'  onChange={(e)=>{
                var status= /^[a-zA-Z0-9]+.{3,15}$/.test(e.target.value);
                if(status){
                    setusername(e.target.value);
                    document.getElementById("text").style.border="2px solid green"
                }
                else{
                    document.getElementById("text").style.border="2px solid red"
                }

            }} required/>
            
            <label className='label'>Email *</label>
            <input type='text' className='form-control' id="mail" onChange={(e)=>{
              var status = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value);
              if(status){
                setmail((e.target.value).toLowerCase());
                document.getElementById("mail").style.border="2px solid green"
              }else{
                document.getElementById("mail").style.border="2px solid red"
              }
            }
          }  required/>
            <label className='label'>Password *</label>
            <input type='password' className='form-control' id='password' onChange={(e)=>{
            var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
            if(status){
                setpassword(e.target.value)
                document.getElementById("password").style.border="2px solid green"
            }else{
                document.getElementById("password").style.border="2px solid red"
            }

            }} required/>
            <br/>
            <button type='submit' className='btn btn-primary'>Signup</button>
            <p id="error"></p>
            <label className='label'>Already have an account?</label>
            
            <button className='btn btn-danger' onClick={(e)=>{
                e.preventDefault();
                navigate('/login')
                
            }}>login</button>

        </form>       
        
        
        </div>  
    </div>

  )
}

export default Register