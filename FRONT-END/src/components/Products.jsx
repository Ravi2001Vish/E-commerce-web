import React, { useEffect, useState } from 'react'
import axios from 'axios'
import{Row , Col} from "react-bootstrap"
import ProductCard from './ProductCard'
import '../App.css'

const Products = () => {
  const [products ,setProducts] = useState([]);
  const [path, setPath] = useState('')
  useEffect(()=>{
    axios.get("http://localhost:7001/get-products")
    .then((res)=>{
setProducts(res.data.data);
console.log(res.data.data)
setPath(res.data.filepath)

    })
  },[])
  return (
    <div  className="productmedia">
      
      {/* <div className="transparent"></div> */}
      <i>
      <h1>Products</h1>

      </i>
      <Row >
        {
          products.length > 0 ?
          products && 
          products.map((product , ind)=>{
            return(
              <Col md={4} key={ind} className='mb-3'>
                <ProductCard product = {product} path={path}/>
              </Col>
            )
          })
        : <i>
          <h1> : Loading</h1>
        </i>
}
      </Row>
      
    </div>
  )
}

export default Products



