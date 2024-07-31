import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "../App.css";


// import "../App.css";
import { FaUserAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { PiShoppingCartFill } from "react-icons/pi";
import {  useState } from "react";
import Search from "./Search";

function Appbar() {
const [logintoken, setLogintoken] = useState(localStorage.getItem("token"))
  const logout=()=>{
    console.log("logout")
    localStorage.removeItem("token");
    window.location.href="/"
    
}
const navigate = useNavigate()
console.log(
  setLogintoken
)







  
  return (
    <>



    <Navbar expand="lg" className="bg-body-tertiary" >
      
      <Container >
        <Navbar.Brand href="#home" style={{ color: "red", fontWeight: "bold" }}>
          MERN STACK
        </Navbar.Brand>
      
        {!logintoken && (
          <div
            onClick={() => navigate("/signup")}
            className="signupicon"
            style={{ fontSize: "20px", cursor: "pointer" }}
          >
            <FaUserAlt />
            <span style={{ fontSize: "15px" }}> Signup / <a href="/login" style={{color:"black" ,textDecoration:"none"}}>Login</a></span>
          </div>
        )}
        {logintoken ? (
        <button onClick={logout} className="logoutbtn">Logout </button>
        
      ):(
        ""
      )}

       
<Search/>
        <span className="carticon1">
          <PiShoppingCartFill />
        </span>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          style={{ border: "1px solid black" }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <NavLink className="nav-link " to="/">
              HOME
            </NavLink>
            <br />
            <NavLink className="nav-link " to="/about">
              ABOUT
            </NavLink>
            <br />
            <NavLink className="nav-link " to="/contact">
              CONTACT
            </NavLink>
            <br />
            <NavLink className="nav-link " to="/products">
              PRODUCTS
            </NavLink>
            
          </Nav>
          
        </Navbar.Collapse>

        <span className="carticon">
            <PiShoppingCartFill onClick={()=>{navigate("/cart")}}/>
          </span>
        
      </Container>
    </Navbar>
</>
  );
}


export default Appbar;
