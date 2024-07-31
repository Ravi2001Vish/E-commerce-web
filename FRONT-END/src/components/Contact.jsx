import React from "react";
import "../App.css";



const Contact = () => {
  
  return (
    <div>
      <div className="contact">
      
        HOME / <span style={{ color: "red" }}> CONTACT </span>
      </div>
      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7534.386990336159!2d72.84933708988973!3d19.230397122244778!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0d42c95bdf9%3A0x5a3374a957943f4b!2sTryCatch%20Classes%20%7C%20Full%20Stack%20Web%20Development%20%7C%20Android%20IOS%20Flutter%20%7C%20Digital%20Marketing%20%7C%20Software%20Testing%20Training%20Course!5e0!3m2!1sen!2sin!4v1708501337340!5m2!1sen!2sin"
          width="1210"
          height="600"
          allowfullscreen=""
          loading="lazy"
          title ="Try Catch"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <div id="contact">
        <div className="information">
          <br /><br />
          <h4>PHONE NO :</h4>+91 9685741236 <br /> +91 9685741236 <br /><br />
          <h4>WEB : </h4>
          yourname@email.com <br />
          yourwebsitename.com
          <br /><br />
          <h4>ADDRESS : </h4>
          Address goes here,
          <br />
          street, Crossroad 123.
        </div>
        <div className="information2"> <br />
          <h5>Get In Touch</h5>
          
          <input type="text" name="" id=""  style={{width:"250px"}} placeholder="Name*"/> <input type="text" name="" id=""  style={{width:"250px"}} placeholder="Email*"/> <br /><br />
          <input type="text" name="" id="" style={{width:"500px"}}  placeholder="Subject*" />
          <br /><br />
          <textarea name="" id="" cols="65" rows="8" placeholder="Your Massege*"></textarea> <br /><br />
          <button className="conbtn" onClick={()=>window.location.href="#"}>SEND</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
