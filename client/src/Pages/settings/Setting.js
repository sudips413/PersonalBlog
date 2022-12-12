import React, { useEffect,useState } from 'react'
import Header from '../../components/Navbar/Header'
import logo from '../../components/image/me.jpg'
import './setting.css'
import axios from 'axios';

export default function Setting() {
    const [user,setuser]=useState([]);
    const[oldpassword,setoldpassword]=useState("");
    const[newpassword,setnewpassword]=useState("");
    const[confirmpassword,setconfirmpassword]=useState("");
    const [wait,setwait]=useState(true);
    const [posts,setposts]=useState([]);
    const id = window.localStorage.getItem("id");
  
    useEffect(() => {
        const id = window.localStorage.getItem("id");
        axios.get(`http://localhost:4000/api/user/${id}`)
        .then(res=>{
            setuser(res.data.users);
        }
        )
        .catch(err=>{
            console.log(err);
        }
        )
        axios.get("http://localhost:4000/api/posts")
        .then((res)=>{
            setposts(res.data);
        }
        )
        .catch((err)=>{
            alert("Error:"+err);
        }
        )

       
        
    }, [])

    const [image,setimage]=useState([])
    function changepassword(e){
        e.preventDefault();
        const id = window.localStorage.getItem("id");
        if(newpassword===confirmpassword){
            axios.put(`http://localhost:4000/api/changepassword/${id}`,
            {
                oldpassword:oldpassword,
                newpassword:newpassword
                }
                )
            .then(res=>{
                document.getElementById("err").innerHTML=res.data.message;
                setTimeout(()=>{
                    setwait(false);
                    },1000);
                    document.getElementById("form").reset();
            })
            .catch(err=>{
                alert("You entered different password");
            })


        }else{
            alert("Password not match");
        }



    }
    
       
    
  return (
    <>
    <Header/>
    <div className='container mt-3'>
        
        <div className='row'>
            <div className="col-lg-4 col-md-4 col-xs-12">
                <div className="card">
                    <div className="card-header text-center">
                        <h3>Profile</h3>
                    <input type="file" name="file" id="file" className="inputfile" style={{display:"none"}} onChange={(e)=>{
                        setimage(e.target.files[0])
                    }}/>
                    {user.image ?
                    <label for="file" id="file" ><img src={`http://localhost:4000/${user.image}`} style={{borderRadius:"50%", height:"100px"}} alt="logo" /></label>:
                    (<label for="file" id="file" ><img src={logo} style={{borderRadius:"50%", height:"100px"}} alt="logo" /></label>)
                    }
                    <br/>
                    <button className="btn btn-info" onClick={
                         (e)=>{
                            e.preventDefault();
                            if(image.length !== 0){
                                const data = new FormData();
                                data.append("file",image);
                                const id = window.localStorage.getItem("id");
                                axios.put(`http://localhost:4000/api/profile/${id}`,data)
                                .then(res=>{
                                    window.location.reload();
                                    document.getElementById("error").innerHTML = "Profile Picture Updated";
                                }
                                )
                                .catch(err=>{
                                    document.getElementById("error").innerHTML = "profile picture not updated";
                                }
                                )
                                

                            }
                            else{
                                document.getElementById("error").innerHTML = "Please Select an Image";
                            }
                    }}>Upload</button>
                    
                    <p id ="error" style={{color:"red"}}></p>
                    
                    </div>
                    <div className="card-body">
                        <div className="details text-center">
                            <label>User Details</label>
                            <div>
                            <span>Name:{user.name}</span>
                            <br/>
                            <span>Email: {user.email}   </span>
                            </div>
                            
                        </div>
                    </div>

                </div>

                    
            </div>            
            <div className="col-lg-8 col-md-8 col-xs-12">
                <div className="row">
                    <div className="card col-lg-12 col-md-12 col-xs-12">  
                    <label style={{color:"orange"}}>My Posts</label>
                    {posts.length >=1 ?( 
                    posts.map((post)=>{
                        if(post.userid===id){
                               return(                
                                <div className="card-header">                                
                                    <div className="card-list">
                                        <div className="card-item">
                                            <div className="card-image">
                                                <img src={`http://localhost:4000/${post.image}`} alt="logo" style={{height:"15%",width:"15%"}} />
                                                <span style={{fontFamily:"monospace",color:"purple",fontSize:"25px"}}>{post.title}</span>
                                            </div>
                                        </div>        
                                    </div> 
                                
                                </div> 
                            )
                               }    
                        })
                    ):(null)
                              
                    } 
                    </div>    


                    <div className="card col-lg-12 col-md-12 col-xs-12">
                    <label style={{color:"orange"}}>Change Password</label>
                        <div className="card-header">
                            
                            <br/>
                            <form onSubmit={changepassword} id="form">
                                <label> Current Password *</label>
                                <input type="password"  className="form-control passwordlabel" id="old" placeholder="Enter Old Password"  onChange={(e)=>{
                                    var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
                                    if(status){
                                        setoldpassword(e.target.value);
                                        document.getElementById("old").style.border="2px solid green"
                                    }else{
                                        document.getElementById("old").style.border="2px solid red"
                                    }

                                }} required/>
                                <label> New Passord *</label>
                                <input type="password"  className="form-control passwordlabel" id="new" placeholder="Enter New Password"  onChange={(e)=>{
                                    var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
                                    if(status){
                                        setnewpassword(e.target.value)
                                        document.getElementById("new").style.border="2px solid green"
                                    }else{
                                        document.getElementById("new").style.border="2px solid red"
                                    }

                                }}required />
                                <label> New Password confirm * </label>
                                <input type="password"  className="form-control passwordlabel" id="confirm" placeholder="Confirm New Password"  
                                onChange={(e)=>{
                                    var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
                                    if(status){
                                        setconfirmpassword(e.target.value)
                                        document.getElementById("confirm").style.border="2px solid green"
                                    }else{
                                        document.getElementById("confirm").style.border="2px solid red"
                                    }

                                }}required />
                                <button type='submit' className="btn btn-primary mt-2 mb-2 col-xs-8" style={{width:"40%"}}>Change Password</button>
                            </form> 
                            {wait && <p id="err" style={{color:"red"}}></p>}   
                        </div>
                    </div>
                </div>    
            </div>               


        </div>          

        
    </div>
    </>

  )
}
