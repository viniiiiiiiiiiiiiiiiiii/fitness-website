import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from "axios"

const SignUp = () => {
    const [hasAccount, setHasAccount] = useState(true);
    const reg = (
                <form onSubmit={(e)=>signup(e)} className="register-form" autoComplete={"off"}>
                    <div className="gridy">
                        <input type="text" id="exampleInputName" placeholder="*First Name"/>
                        {/* <input type="text" placeholder="*Last Name"/> */}
                        <input type="email" id="exampleInputEmail1" placeholder="*Email Address" autoComplete="off"/>
                    </div>
                    <div className="gridy">
                        <input type="password" id="exampleInputPassword1" placeholder="*Password" />
                        {/* <input type="password" placeholder="*Confirm Password"/> */}
                    <button className="register-btn" >Join Now</button>
                    </div>
                </form>
    );
    const log = (
                <form onSubmit={(e)=>login(e)} className="log-form" autoComplete={"off"}>
                    <div className="gridy">
                        <input type="email" id="exampleInputEmail1" placeholder="*Email Address" autoComplete={"off"}/>
                        <input type="password" id="exampleInputPassword1" placeholder="*Password" />
                    <button className="register-btn" >Log In</button>
                    </div>
                </form>
    )
    function signup(e){
        e.preventDefault();
        let request={
          name:document.getElementById("exampleInputName").value,
          email: document.getElementById("exampleInputEmail1").value,
          password:document.getElementById("exampleInputPassword1").value
        }
        console.log(request);
        axios.post("http://localhost:3000/signup",request)
        .then(resp=>{
          alert(resp.data.message);
          console.log(resp.data.message);
        })
        .catch(err=>{
          console.log(err);
        })
      }
      function login(e){
        e.preventDefault();
        let request={
          email: document.getElementById("exampleInputEmail1").value,
          password:document.getElementById("exampleInputPassword1").value
        }
        axios.post("http://localhost:3000/login",request)
        .then(resp=>{
          alert(resp.data.message);
          console.log(resp.data.message);
        })
        .catch(err=>{
          console.log(err);
        })
      }
      
    return (
        <main>
            <Navbar />
            
            <div className="register-content">
                <button className="sign-toggle-box">
                    <span className={`sign-toggle sign-toggle-${hasAccount}`} onClick={()=>setHasAccount(!hasAccount)}></span>
                </button>
                {hasAccount? log:reg}
            </div>
            <Footer />
        </main>
    )
}

export default SignUp
