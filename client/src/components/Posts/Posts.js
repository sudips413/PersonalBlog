import React from 'react'
import './Posts.css'
import {useEffect} from 'react'
import axios from 'axios';
import {useState} from 'react'
import {useContext} from 'react'
import { UserContext } from '../../contexts/Usercontext';
import Popup from '../popup/Popup';
import Edit from '../popup/Edit';
import "@fontsource/open-sans";



function Posts() {
  const [posts,setposts] =useState([]);
  const {setuser}= useContext(UserContext);
  const [title,settitle] = useState("");
  const [popup,setpopup] = useState(false);
  const [postid,setpostid] = useState(null);
  const [postcontent,setpost] = useState([]);
  const [editpopup,seteditpopup] = useState(false);
  

//   const [userdetail,setuserdetail]=useState([]);
    useEffect(()=>{
        setuser(window.localStorage.getItem("user"));

        axios.get("http://localhost:4000/api/posts")
        .then((res)=>{
            setposts(res.data);
        }
        )
        .catch((err)=>{
        }
        )
       
        


        
    },[])
    // useEffect(()=>{
    //     axios.get("http://localhost:4000/api/users")
    //     .then(res=>{
    //         setuserdetail(res.data.users);
            
    //     }
    //     )
    //     .catch(err=>{
    //         console.log(err);
    //     }
    //     )
    // },[posts])
    
 


   
  return (
    <div className='container mt-5'>
        {posts.map((post,index)=>{
            return(
        <div className='row mt-5 mb-0'>
            <div className='col-md-12 col-lg-12 col-xs-12'>
                
                    <div className='card-body'>
                        <div className='text-center mb-2'>
                            <img src={`http://localhost:4000/${post.image}`}  className="PostImage" alt="logo"/>
                        </div>
                        <div className='details'>
                            <h3 style={{textAlign:"center"}} className='title'>{post.title}</h3>
                            <p className='card-content'>
                                {post.description}
                            </p>
                            <br/>
                            <div className="actions ">
                                <span className='bottom-action username'>Author: {post.username}</span>
                               
                                {
                                    localStorage.getItem("id")===post.userid?
                                    <><span className='bottom-action'><i className="fa fa-trash" style={{color:"red"}}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setpopup(true);
                                        settitle(post.title);
                                        setpostid(post._id);

                                    }
                                        

                                    }
                                    /> Delete</span>
                                    <span className='bottom-action' ><i className="fa fa-edit" style={{color:"green"}}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        seteditpopup(true);
                                        setpost(post)
                                        

                                    }
                                        

                                    }/> Edit</span>
                                    </>
                                    :null

                                }
                                 <span className='bottom-action'><i className="fa fa-clock-o"/> {new Date(post.date).toDateString()}</span>
                            </div>

                        </div>
                    </div>
                    
            </div> 
            
             
        </div>)
        
        })
        }
        {popup?
        <Popup closepopup={()=>{
            setpopup(false);
        }} title={title} id={postid}/>:null
        }
        {editpopup?
        <Edit closepopup={()=>{
            seteditpopup(false);
        }
        }content={postcontent}/>:null
    }
        
    </div>            
  )
}

export default Posts