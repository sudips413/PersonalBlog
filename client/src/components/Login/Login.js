import React,{useState,useContext} from 'react'
import {UserContext} from '../../contexts/Usercontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './login.css'




export default function Login() {
    const {user,setuser} = useContext(UserContext);
    const [email,setemail] = React.useState("");
    const [password,setpassword] = React.useState("");
    const navigate = useNavigate();
    const [error,seterror] = useState(true);

  return (
    <>
    
    <div className='container mt-0 '>
      <div className='row '>
         
        <div className="logo text-center col-12">
          <img src="https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png" style={{width:"30%"}} alt="logo" />
        </div>
      
      
      
        <form className="form col-12" onSubmit={async (e)=>{
          e.preventDefault();
          if(email && password){
            await axios.post("http://localhost:4000/api/login",{
              email:email,
              password:password

            })
            .then((res)=>{
              if(res.data.success){
              setuser(email);
              window.localStorage.setItem("user",res.data.username);
              window.localStorage.setItem("id",res.data.id);
              navigate('/')
              }
              else{

                document.getElementById("error").innerHTML = "User Doesnt Exist";
                setTimeout(()=>{
                  seterror(false);
                },500);
                
              }
            }
            )
            .catch((err)=>{
              document.getElementById("error").innerHTML =  "Credentials are wrong";
              setTimeout(()=>{
                seterror(false);
              },500);
              seterror(true);


            })
        }
        else
        {
          document.getElementById("error").innerHTML = "Please fill all the fields correctly";
          setTimeout(()=>{
            seterror(false);
          },500);
          seterror(true);
        }
            
        }}>
          <h2>SIGN IN</h2>
          <label className='label'>Email *</label>
          <input type='text' className='form-control'  id="mail"
          onChange={(e)=>{
              var status = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value);
              if(status){
                setemail((e.target.value).toLowerCase());
                document.getElementById("mail").style.border="2px solid green"
              }else{
                document.getElementById("mail").style.border="2px solid red"
              }
            }
          } required/>
          <label className='label'>Password *</label>
          <input type='password' className='form-control'  id="password"
          onChange={(e)=>{
            var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
            if(status){
                setpassword(e.target.value)
                document.getElementById("password").style.border="2px solid green"
            }else{
                document.getElementById("password").style.border="2px solid red"
            }

        }}
           required/>
          <label className='label' style={{color:"red"}}>forgot password?</label>
          <br/>
          <button type='submit' className='btn btn-primary'>Login</button>
          {error && <p id="error"></p>}
          <div className='text'>
          <label className='label'>No account?</label>
          <br/>
          <button className='btn btn-dark' onClick={()=>{navigate('/register')}}>Signup</button>
        </div>  
        </form>
        
      </div>  
      
       

    </div>
    
    </>

  )
}
