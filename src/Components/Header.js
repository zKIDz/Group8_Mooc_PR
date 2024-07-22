import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const [categories, setCategories] = useState([]);
    const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Điều hướng đến trang đăng nhập
  };
    useEffect(() => {
        axios.get('http://localhost:9999/categories').then((response) => {
            setCategories(response.data);
        });
    }, []);

    return (
        <div>
            <div className="header">
                <Container>
                    <div className="header-content">
                        Ưu đãi 5% cho đơn hàng nguyên giá đầu tiên* | Nhập mã: MLBWELCOME
                    </div>
                </Container>
            </div>


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
                            {categories.map((category) => (
                                <LinkContainer key={category.id} to={`/category/${category.id}`}>
                                    <Nav.Link>{category.name}</Nav.Link>
                                </LinkContainer>
                            ))}
                        </Nav>
                        { localStorage.getItem('role')==="admin"?
                        <Nav>
                        <Nav.Link href="/admin">
                            AdminPage
                        </Nav.Link>
                    </Nav>:
                    <Nav>
                    <Nav.Link href="/pro">
                        Profile
                    </Nav.Link>
                </Nav>
                    }
                        
                        <Nav className="ml-auto">
                            <Nav.Link href="#search">
                                <i className="bi bi-search"></i>
                            </Nav.Link>
                            <LinkContainer to="/cart">
                                <Nav.Link>
                                    <i className="bi bi-bag"></i>
                                </Nav.Link>
                            </LinkContainer>
                            <Nav.Link href="#wishlist">
                                <i className="bi bi-heart"></i>
                            </Nav.Link>
                            {localStorage.getItem('role')!=""
                            ?<Nav.Link href="/login">
                            <i className="bi bi-person"></i>
                        </Nav.Link>
                        : <button onClick={handleLogout}>Logout</button>}
                            {/* <Nav.Link href="/login">
                                <i className="bi bi-person"></i>
                            </Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        </div>
    );
}
