import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const OrderManagement = () => {
    
    const [orders, setOrders] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:9999/orders?customerId=${user.id}`);
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, [user.id]);

    return (
        <Container style={{ minHeight: '40vh'}} className="order-management">
            <h1>Quản lý đơn hàng</h1>
            {orders.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID Đơn hàng</th>
                            <th>Tổng cộng</th>
                            <th>Trạng thái</th>
                            <th>Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.oid}>
                                <td>{order.id}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>{order.status === "false" ? "Đang xử lý" : "Hoàn thành"}</td>
                                <td>
                                    <Button as={Link} to={`/order-details/${order.id}`} variant="info">
                                        Xem chi tiết
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>Không có đơn hàng nào.</p>
            )}
        </Container>
    );
};

export default OrderManagement;
