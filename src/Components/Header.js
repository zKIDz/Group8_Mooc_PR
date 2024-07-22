import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';
export default function Header() {
    return (
        <div>
             <div className="header">
        <Container>
          <div className="header-content">
            Ưu đãi 5% cho đơn hàng nguyên giá đầu tiên* | Nhập mã: MLBWELCOME
          </div>
        </Container>
      </div>

      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="main-navbar">
        <Container>
          <Navbar.Brand href="/">
            <img
              src="https://1000logos.net/wp-content/uploads/2017/04/MLB-Logo.png"  
              alt="Logo"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">QUẦN ÁO</Nav.Link>
              <Nav.Link href="#link">MŨ NÓN</Nav.Link>
              <Nav.Link href="#link">GIÀY DÉP</Nav.Link>
              <Nav.Link href="#link">TÚI VÍ</Nav.Link>
              <Nav.Link href="#link">PHỤ KIỆN</Nav.Link>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link href="#search">
                <i className="bi bi-search"></i> 
              </Nav.Link>
              <Nav.Link href="/cart">
                <i className="bi bi-bag"></i>
              </Nav.Link>
              <Nav.Link href="#wishlist">
                <i className="bi bi-heart"></i>
              </Nav.Link>
              <Nav.Link href="/login">
                <i className="bi bi-person"></i>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
   
        </div>
        
    );
}