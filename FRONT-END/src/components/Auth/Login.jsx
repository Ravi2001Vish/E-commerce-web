import React, {  useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const  navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:7001/user-login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.message.includes("Login Sucessful") ){
          window.localStorage.setItem("user", JSON.stringify(data.data));
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("loggedIn", true);

          window.location.href="products"

        }
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
         <div>
         
          <h3 style={{color:"white"}}>LOGIN</h3>
          
         </div>
         
          <br />

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


          <div className="d-grid" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <button type="submit" className="btn btn-danger" style={{width:"180px"}}>
              Submit
            </button>
          </div>
          <p className="forgot-password text-right"><br />
            <a href="/signup" style={{color:"white"}}>SIGN-UP</a>
          </p>
        </form>
      </div>
    </div>
  );
}