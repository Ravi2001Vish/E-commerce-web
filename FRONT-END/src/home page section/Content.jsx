import React, { useState } from "react";
import "../App.css";

import cloth1 from "../react image/cloth1.jpg";
import cloth2 from "../react image/cloth2.jpg";
import cloth3 from "../react image/cloth3.jpg";

import e1 from "../react image/e1.jpg";
import e2 from "../react image/e2.jpg";
import e3 from "../react image/e3.jpg";

import s1 from "../react image/s1.jpg";
import s2 from "../react image/s2.jpg";
import s3 from "../react image/s3.jpg";
import deal from "../react image/deal-2.png";
import time from "../react image/time.png"
import { useNavigate } from "react-router-dom";
import CountUps from "../components/CountUps";



const Content = () => {
  const [tab, setTab] = useState(1);
  const navigate = useNavigate();

  const dishandler=()=>{
    navigate("/products")
  }

  const action = (index) => {
    setTab(index);
  };

  return (
    <div className="app">
      <h2>Featured Product</h2>
      <br />
      <br />
      <div className="box">
        <div className="tabs">
          <div
            className={`${tab === 1 ? "tab active-tab" : "tab"}`}
            onMouseOver={() => action(1)}
          >
            Cloths
          </div>

          <div
            className={`${tab === 2 ? "tab active-tab" : "tab"}`}
            onMouseOver={() => action(2)}
          >
            Eletronics
          </div>

          <div
            className={`${tab === 3 ? "tab active-tab" : "tab"}`}
            onMouseOver={() => action(3)}
          >
            Shoes
          </div>
        </div>

        <div className="container">
          <div
            className={`${tab === 1 ? "content active-content" : "content"}`}
          >
            <br />
            <br />
            <div className="cloth">
              <div className="img1">
                <img
                  src={cloth1}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>

              <div className="img2">
                <img
                  src={cloth2}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>
              <div className="img3">
                <img
                  src={cloth3}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>
            </div>
          </div>

          <div
            className={`${tab === 2 ? "content active-content" : "content"}`}
          >
            <br />
            <br />

            <div className="cloth">
              <div className="img1">
                <img
                  src={e1}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>
              <div className="img2">
                <img
                  src={e2}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>
              <div className="img3">
                <img
                  src={e3}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>
            </div>
          </div>

          <div
            className={`${tab === 3 ? "content active-content" : "content"}`}
          >
            <br />
            <br />
            <div className="cloth">
              <div className="img1">
                <img
                  src={s1}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>
              <div className="img2">
                <img
                  src={s2}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>
              <div className="img3">
                <img
                  src={s3}
                  alt=""
                  height="100%"
                  width="100%"
                  onClick={() => (window.location.href = "products")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="discover" onClick={dishandler}>Discover Me</button>
      <div className="section2">
        <div className="insec2"><h2>Men Fashion Shop</h2> <p>Choose Your Product Here</p></div>
        <div className="insec22"><h2>Men Fashion Shop</h2> <p>Choose Your Product Here</p></div>
      </div>

      

      <div className="section3">
        <div className="insec3"><img src={deal} alt="" /></div>
        <div className="insec33"><h1>Deal of the day</h1>
        <img src={time} alt="" />
      <button className="discover" onClick={()=>window.location.href="#"}>Discover Me</button>

        </div>
      </div>
  <CountUps/>
    </div>
  );
};

export default Content;
