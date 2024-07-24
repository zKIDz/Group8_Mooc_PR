import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const CheckOut = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const cartItems = location.state?.cartItems || [];

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        deliveryMethod: 'home',
        address: '',
        district: '',
        city: '',
        ward: '',
        addressType: 'home',
        promoCode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Container>
            <h2>Thông tin giao hàng</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="fullName">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập Họ và tên"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập Email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="phone">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập Số điện thoại"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                            <Form.Text className="text-muted">
                                Số điện thoại không hợp lệ (độ dài từ 10 - 11 ký tự, không chứa ký tự đặc biệt và khoảng trắng)
                            </Form.Text>
                        </Form.Group>

                       

                        <Form.Group controlId="address">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Địa chỉ"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="district">
                            <Form.Label>Quận / Huyện</Form.Label>
                            <Form.Control
                                as="select"
                                name="district"
                                value={formData.district}
                                onChange={handleChange}
                            >
                                <option>Chọn quận / huyện</option>
                                {/* Add options for districts */}
                            </Form.Control>
                        </Form.Group>


                        <Form.Group controlId="city">
                            <Form.Label>Tỉnh / Thành</Form.Label>
                            <Form.Control
                                as="select"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            >
                                <option>Chọn tỉnh / thành</option>
                                {/* Add options for cities */}
                            </Form.Control>
                        </Form.Group>

                        <Form.Group controlId="ward">
                            <Form.Label>Phường / Xã</Form.Label>
                            <Form.Control
                                as="select"
                                name="ward"
                                value={formData.ward}
                                onChange={handleChange}
                            >
                                <option>Chọn phường / xã</option>
                                {/* Add options for wards */}
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <div className="order-summary">
                            <h3>Tóm tắt đơn hàng</h3>
                            {cartItems.map((item) => (
                                <div className="order-item" key={`${item.id}-${item.size}`}>
                                    <div className="item-image">
                                        <img src={item.images[0]?.name} alt={item.name} />
                                    </div>
                                    <div className="item-details">
                                        <h4>{item.name}</h4>
                                        <p>Size: {item.size}</p>
                                        <p>Giá: ${item.price.toFixed(2)}</p>
                                        <p>Số lượng: {item.quantity}</p>
                                        <p>Tổng: ${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                            <div className="order-total">
                                <h4>Tổng cộng</h4>
                                <p>{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)} USD</p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className="order-actions">
                    <Button variant="secondary" type="button" onClick={() => navigate('/cart')}>Quay lại giỏ hàng</Button>
                    <Button variant="primary" type="submit">Hoàn tất đơn hàng</Button>
                </div>
            </Form>
        </Container>
    );
};

export default CheckOut;
