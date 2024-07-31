import React, { useState} from "react";
import axios from "axios";

export default function SignUp() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact]= useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:7001/sign-up", {
        name,
        email,
        password,
        contact,
      });
      console.log(response.data, "userRegister");
      if(response.data.message.includes("Signup Successful")){
        window.location.href="login"
      }else{
        alert("Something went wrong");
      }
    

 


 

    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
          <h3 style={{color:"white"}}>Sign Up</h3><br />

          <div className="mb-3">
            {/* <label>First name</label> */}
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={(e) => setname(e.target.value)}
            />
          </div>

          <div className="mb-3">
            {/* <label>Email address</label> */}
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            {/* <label>Password</label> */}
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-3">
            {/* <label>Contact</label> */}
            <input
              type="number"
              className="form-control"
              placeholder="Enter Contact No."
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="d-grid" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <button type="submit" className="btn btn-danger" style={{width:"180px"}}>
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right" style={{color:"white"}}>
            <br />
            Already registered : <a href="/login" style={{color:"white"}}>LOGIN</a>
          </p>
        </form>
      </div>
    </div>
  );
}