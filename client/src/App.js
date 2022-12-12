import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
 } from "react-router-dom";
import Header from "./components/Navbar/Header";
import Login from "./components/Login/Login";


import { UserContext } from "./contexts/Usercontext";
import Register from "./components/Register/Register";
import Home from "./Pages/Home/Home";
import Ideas from "./Pages/Ideas/Ideas";
import Setting from "./Pages/settings/Setting";
import Footer from "./components/footer/Footer";


function App() {
  const [user,setuser]=useState("");

  
  
  return (
   <>
   <Router>
    <UserContext.Provider value={{user,setuser}}>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
        <Route path="/ideas" element={<Ideas/>}/>
        <Route path="/setting" element={<Setting/>}/>
      </Routes>
      <Footer/>
    </UserContext.Provider>  
      

   </Router>
   



   
   </>
  );
}

export default App;
