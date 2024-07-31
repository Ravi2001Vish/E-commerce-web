import axios from "axios";
import React, { useEffect, useState } from "react";
// import { Row, Col } from 'react-bootstrap';
import "../App.css";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [path, setPath] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`http://localhost:7001/get-cart/${user.id}`)
      .then((res) => {
        setCartItems(res.data.data);
        setPath(res.data.filepath);
      })
      .catch((error) => {
        console.error("Error fetching cart items:", error);
      });
  }, []);

  const handleUpdateQuantity = async (itemId, type) => {
    try {
      await axios.put(
        `http://localhost:7001/update-quantity/${itemId}?type=${type}`
      );

      const user = JSON.parse(localStorage.getItem("user"));
      const response = await axios.get(
        `http://localhost:7001/get-cart/${user.id}`
      );
      setCartItems(response.data.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const calculateTotalPrice = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };
 
  return (
    <div>
      <div>
        {cartItems &&
          cartItems.map((cart, ind) => {
            return (
              <div
                key={ind}
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  borderBottom: "1px solid green",
                  width: "100%",

                  padding: "10px",
                }}
              >
                <div>
                  <img
                    src={`${path}${cart.image}`}
                    alt=""
                    className="cartimg"
                  />
                </div>
                <div style={{ display: "flex"  , justifyContent:"center", width:"40%"}}>
                  <div style={{ paddingRight: "0px", fontWeight: "bold" }}>
                    <p> Name: {cart.title}</p>
                  </div>
                  <div style={{ paddingLeft: "60px", fontWeight: "bold" }}>
                    <p> Price: {cart.price}</p>
                  </div>
                  <div style={{ paddingLeft: "60px", fontWeight: "bold" }}>
                    <p> Quantity: {cart.quantity}</p>
                  </div>
                  <div style={{ paddingLeft: "60px", fontWeight: "bold" }}>
                    <p>
                      Total Price:   {calculateTotalPrice(cart.price, cart.quantity)}
                    
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    width: "200px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "15px",
                  }}
                >
                  <button
                    onClick={() => handleUpdateQuantity(cart._id, "inc")}
                    style={{
                      borderRadius: "50%",
                      border: "none",
                      backgroundColor: "orange",
                      height: "40px",
                      width: "40px",
                    }}
                  >
                    <span>+</span>
                  </button>
                  <button
                    onClick={() => handleUpdateQuantity(cart._id, "desc")}
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "skyblue",
                      border: "none",
                      height: "40px",
                      width: "40px",
                      
                    }}
                  >
                    <span >-</span>
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <br />

      <Button
        onClick={() => {
          navigate("/products");
        }}
      >
        Add More Products
      </Button>
    </div>
  );
};

export default Cart;
