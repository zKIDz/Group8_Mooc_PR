import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Cart() {
    const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem('cart')) || []);
    const subTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shippingCost = subTotal ? 5 : 0; 
    const total = subTotal + shippingCost;

    const handleClearCart = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
    };

    return (
        <>
            
            <Container style={{ minHeight: '60vh' }}>
                <h1 className="text-center">SHOPPING CART</h1>
                <Row className="my-3">
                    <Col xs={12} md={8}>
                        {cartItems.length > 0 ? (
                            <>
                                <div className="d-flex justify-content-between mb-3">
                                    
                                    <Button variant="danger" onClick={handleClearCart}>Xóa</Button>
                                </div>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Ảnh</th>
                                            <th>Số lượng</th>
                                            <th>Tổng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>${item.price}</td>
                                                <td><img src={`${item.images[0]?.name}`} alt={item.name} style={{ width: '50px' }} /></td>
                                                <td>{item.quantity}</td>
                                                <td>${(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </>
                        ) : (
                            <div className="text-center empty-cart">
                                <p>Không có sản phẩm nào trong giỏ hàng</p>
                                <Link to="/" className="btn btn-primary">Tiếp tục mua hàng</Link>
                            </div>
                        )}
                    </Col>
                    <Col xs={12} md={4}>
                        <div className="order-summary">
                            <h4>THÔNG TIN ĐƠN HÀNG</h4>
                            <div className="order-summary-details">
                                <p>Tạm tính: {subTotal.toFixed(2)} USD</p>
                                <p>Phí vận chuyển: {shippingCost.toFixed(2)} USD</p>
                                <h4>Tổng đơn hàng: {total.toFixed(2)} USD</h4>
                            </div>
                            <Button className="btn-block" disabled={cartItems.length === 0}>THANH TOÁN</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </>
    );
}