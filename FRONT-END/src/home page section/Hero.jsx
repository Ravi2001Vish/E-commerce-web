import Carousel from "react-bootstrap/Carousel";

import "../App.css";

function hero() {
  const shoptoproduct =()=>{
    window.location.href='products'
  }
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item className="caroimg1">
        <h4>Enjoy This Offer Today</h4>
        <h1>New Collection </h1>
        <h2>Sale 40%</h2>
       <button className="shopnow" onClick={shoptoproduct}><span>SHOP NOW</span></button>
      </Carousel.Item>

      <Carousel.Item className="caroimg2">
        <h4>Enjoy This Offer Today</h4>
        <h1>New Collection </h1>
        <h2>Sale 40%</h2>

        <button className="shopnow" onClick={shoptoproduct}><span>SHOP NOW</span></button>
  
      </Carousel.Item>
    </Carousel>
  );
}

export default hero;



