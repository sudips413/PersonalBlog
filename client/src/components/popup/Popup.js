import React from 'react'
import './Popus.css'
import axios from 'axios';

export default function Popup({closepopup,title,id}) {
    return (
        <div className="popup-container">
         <div className="popup-body">
          <div className="popup-header">
            <center>
          
            <br/>
            
            <h2><i className="fa fa-trash"style={{
                color:"red"
            }}/></h2>
            <br/>
            <h4>Are you sure to delete {title} post?
            </h4>
            <br/>
            <br/>
            <button type="submit" className="btn btn-danger" onClick={(e)=>{
                e.preventDefault();
                axios.delete(`http://localhost:4000/api/delete/${id}`)
                .then(res=>{
                    document.getElementById("error").innerHTML=res.data.message;
                    setTimeout(() => {
                        window.location.reload();
                    }, 500);
                })
                .catch(err=>{
                    alert(err);
                }
                )


            }}>Yes,Delete it</button>
            <br/>
            <br/>
            <button className="btn btn-info" onClick={closepopup}>No</button>
            <p id='error'></p>
                

          
            </center>
          </div>
          
          
         </div>
        </div>
      );
}
