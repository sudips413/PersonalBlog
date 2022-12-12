import React from 'react'
import './edit.css'
import axios from 'axios';

export default function Edit({closepopup,content}) {
    const[newtitle,setnewtitle]=React.useState(content.title);
    const[newcontent,setnewcontent]=React.useState(content.description);
    const image = document.getElementById("image");

    return (
    <div className="popup-container">
     <div className="popup-body col-lg-8 col-md-10 col-xs-12">
      <div className="popup-header">
        <center>
      <button className="close-btn mr-0 mt-2"  onClick={closepopup}>X</button>
        <h3 className="text-center ">Edit {content.title} Post</h3>
        <form  onSubmit={(e)=>{
                e.preventDefault();               
                
                const data = new FormData();
                data.append("title",newtitle);
                data.append("description",newcontent);
                data.append("file",image);
                data.append("userid",window.localStorage.getItem("id"));
                data.append("username",window.localStorage.getItem("user"));
                console.log(data);
                console.log(content._id);
                    

                axios.put(`http://localhost:4000/api/update/${content._id}`,data,{
                    headers:{
                        "Content-Type":"multipart/form-data"                      
                    }
                            
                })   
                .then(res=>{
                    document.getElementById("error").innerHTML=res.data.message;
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                })
                .catch(err=>{
                    alert(err);
                })

          }}>
          <div className="form-group">           
            
            <input type="text" defaultValue={content.title} className="form-control" id="title" aria-describedby="emailHelp" onChange={(e)=>{
                setnewtitle(e.target.value);
            }} required  />
          </div>
          <div className="form-group">
            
            <textarea className="form-control" defaultValue={content.description} id="edescription" rows="5" onChange={(e)=>{
                setnewcontent(e.target.value);

            }}required></textarea>
          </div>
          {/* <div className="form-group">
            <input type="file" id="image" className="form-control mt-2" accept="image/png, image/gif, image/jpeg" 
            src={content.image}
           />
          </div> */}
          <center>
          <button type="submit" className="btn2 btn-primary mt-2">Update</button>
          </center>
          <p id="error"></p>

        </form>
      
        </center>
      </div>
      
      
     </div>
    </div>
      );
}
