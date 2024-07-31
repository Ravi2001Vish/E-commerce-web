import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useNavigate } from 'react-router-dom';
import { truncate } from '../util';
import axios from 'axios';
import {Container} from 'react-bootstrap'

function ProductCard({ product, path }) {
  const navigate = useNavigate();
  const cart = (productid) => {
    // window.location.href = "cart"
    const user = JSON.parse(localStorage.getItem('user'))
    console.log(user)
    if(localStorage.getItem("token")){
      const data = { productID: productid, userID: user.id }
      axios.post('http://localhost:7001/add-to-cart', data)
        .then(res => {
          console.log(res);
          // navigate('/cart')
          alert("Product has been add to your cart")
        })
        .catch(err => {
          console.log(err)
        })
    }
    else{
      navigate("/signup")
    }
  
  }
  console.log('product', product)
  return (
    
   
      <Container>
   <Card style={{ width: '100%',   }}>
     
        <img style={{ width: "100%", height: "300px" }} src={path + product.thumbnail} alt="" />
      
      <Card.Body>
        <Card.Title>{truncate(product.title, 20)}</Card.Title>
        <span>Rs. {product.price}</span><br />
        <Card.Text>
          {truncate(product.description, 100)}
        </Card.Text>
        <Button variant="primary"><Link className='text-light' to={`/product/${product._id}`} style={{textDecoration:"none"}}>View Details</Link></Button>
        <Button className='ms-4' onClick={() => cart(product._id)}>Add to Cart</Button>
      </Card.Body>
    </Card>
    </Container>
    
   
 
  );
}

export default ProductCard;