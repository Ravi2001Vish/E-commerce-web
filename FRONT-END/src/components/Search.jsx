import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Search = () => {
  const [products, setProducts] = useState([]);
  const [inputvalue, setInputvalue] = useState("");

  const onSearchHandler = (e) => {
    const value = e.target.value;
    setInputvalue(value);
    axios
      .get(`http://localhost:7001/get-products?search=${value}`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ position: "relative" }} id="hide">
      {
        <input
          type="search"
          name=""
          id="inp1"
          onChange={onSearchHandler}
          placeholder="Search..."
          style={{
            width: "200px",
            marginLeft: "90px",
            border: "1px solid lightgray",
            outline: "none",
          }}
        />
      }
      {products && products.length > 0 && inputvalue.length > 0 ? (
        <div
          style={{
            height: "200px",
            width: "200px",
            border: "1px solid lightgray",
            position: "absolute",
            zIndex: 99,
            left: 90,
            overflowY: "scroll",
            background: "#fff",
          }}
        >
          {products &&
            products.map((product) => {
              return (
                <p key={product._id}>
                  <Link to={`/product/${product._id}`}>{product.title}</Link>
                </p>
              );
            })}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
