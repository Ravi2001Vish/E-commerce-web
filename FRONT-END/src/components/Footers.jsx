import React from "react";
import "../App.css";
const Footers = () => {
  return (
    <div className="mainfooter">
      <div className="footer1">
        <h5>ABOUT US</h5>
        <p>About us</p>
        <p>Store location</p>
        <p>Contact</p>
        <p>Orders tracking</p>
      </div>

      <div className="footer2">
        <h5>USEFUL LINKS</h5>
        <p>Returns</p>
        <p> Support Policy</p>
        <p> Size guide</p>
        <p> FAQs</p>
      </div>
      <div className="footer3">
        <h5>FOLLOW US</h5>
        <p> Facebook </p>
        <p> Twitter </p>
        <p> Instagram </p>
        <p> Youtube </p>
      </div>
      <div className="footer4">
        <h5>SUBSCRIBE</h5>
        <p>
          Get E-mail updates about our latest shop <br /> and special offers.
        </p>
        <input
          type="text"
          name=""
          id="footerinp"
          placeholder="Enter Your Email Address"
        />
        <p onClick={()=>window.location.href='#'} style={{ color: "black" , cursor:"pointer"}}>
          Subscribe
        </p>
      </div>
    </div>
  );
};

export default Footers;
