// import logo from './logo.svg';
import "./App.css";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products";
import Appbar from "./components/Appbar";

import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Product from "./components/Product";
import Cart from "./components/Cart";
import Footers from "./components/Footers";

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/product/:product_id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          <Footers />
        </Router>
      </>
    </div>
  );
}

export default App;
