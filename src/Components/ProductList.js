import React from "react";
import { Container,Carousel,Row,Col,Card,Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './ProductList.css'; 
export function ProductList() {
const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const addToCart = (productId) => {
  let cartItem = JSON.parse(localStorage.getItem('cart')) || [];
  let existingProduct = cartItem.findIndex(item => item.id === productId);
  if (existingProduct !== -1) {
    cartItem[existingProduct].quantity += 1;
  } else {
    let addProduct = products.findIndex(p => p.id === productId);
    cartItem.push({ ...products[addProduct], quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cartItem));
  alert(`Your product has been added to the cart!`); 
};


useEffect(() => {
  axios.get ("http://localhost:9999/categories").then((response) => {
    setCategories(response.data);
  });

  axios.get ("http://localhost:9999/products").then((response) => {
    setProducts(response.data);
  });
}, []);

  return (
    <div>
      <Carousel controls={true} indicators={false}>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://file.hstatic.net/200000642007/file/vn__2_.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://file.hstatic.net/200000642007/file/desktop-1920x640_690adfdae05f4db8a2b7ca47d95f236d.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-100"
            src="https://file.hstatic.net/200000642007/file/1920x640_f3fc87c077684b3782a0a793403bbf65.jpg"
            alt="Second slide"
          />
        </Carousel.Item>

      </Carousel>

      <Container style={{ marginBottom: '30px' }}>
      <Row className="mt-3">
                            {products.map((p) => (
                                <Col key={p.id} sm={6} md={4} lg={3}>
                                    <Card >
                                        <Card.Body >
                                            <Card.Img 
                                                className="product-image"
                                                variant="top"
                                                src={`${p.images[0]?.name}`} 
                                                alt={p?.name}
                                            />
                                            <Card.Title>{p?.name}</Card.Title>
                                            <Card.Text>
                                                <strong>Price:</strong> {p?.price} USD<br></br>
                                                <strong>Status:</strong>
                                                {p?.status ? (
                                                    <span style={{ color: 'green' }}>In stock</span>
                                                ) : ( 
                                                    <span style={{ color: 'red' }}>Out of stock</span>
                                                )}
                                                <br />
                                            </Card.Text>
                                            <Card.Text>
                                            <Link className="btn btn-danger" to={`/product/${p.id}`}>Detail</Link>
                                            <Button variant="success" onClick={() => addToCart(p.id)}>Add to Cart</Button>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
      
                        </Container>
    </div>
  );
}
