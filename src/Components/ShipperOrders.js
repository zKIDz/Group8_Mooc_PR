import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShipperOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:9999/orders');
                const ordersData = response.data;

                // Fetch user details for each order
                const updatedOrders = await Promise.all(
                    ordersData.map(async (order) => {
                        try {
                            const userResponse = await axios.get(`http://localhost:9999/users/${order.customerId}`);
                            return {
                                ...order,
                                user: userResponse.data,
                            };
                        } catch (userError) {
                            console.error('Error fetching user details:', userError);
                            return {
                                ...order,
                                user: null,
                            };
                        }
                    })
                );

                setOrders(updatedOrders);
            } catch (fetchError) {
                console.error('Error fetching orders:', fetchError);
                setError('Có lỗi xảy ra khi lấy dữ liệu đơn hàng.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const updateOrderStatus = async (orderId, currentStatus) => {
        if (currentStatus === 'false') {
            const confirmation = window.confirm('Bạn có chắc muốn thay đổi trạng thái của đơn hàng này?');
            if (!confirmation) {
                return;
            }
        }

        try {
            await axios.patch(`http://localhost:9999/orders/${orderId}`, { status: currentStatus === 'false' ? 'true' : 'false' });
            setOrders((prevOrders) =>
                prevOrders.map((order) => (order.id === orderId ? { ...order, status: currentStatus === 'false' ? 'true' : 'false' } : order))
            );
        } catch (error) {
            console.error('Error updating order status:', error);
            setError('Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.');
        }
    };

    if (loading) {
        return <p>Đang tải...</p>;
    }

    return (
        <Container style={{ minHeight: '40vh' }} className="shipper-orders">
            <h1>Quản lý đơn hàng cho Shipper</h1>
            {error && <p className="text-danger">{error}</p>}
            {orders.length > 0 ? (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID Đơn hàng</th>
                            <th>Tên người nhận</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Tổng cộng</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.user?.fullName || 'N/A'}</td>
                                <td>{order.user?.address || 'N/A'}</td>
                                <td>{order.user?.phoneNumber || 'N/A'}</td>
                                <td>${order.total.toFixed(2)}</td>
                                <td>{order.status === 'false' ? 'Đang xử lý' : 'Hoàn thành'}</td>
                                <td>
                                    <Button as={Link} to={`/order-details/${order.id}`} variant="info" className="me-2">
                                        Xem chi tiết
                                    </Button>
                                    <Button
                                        onClick={() => updateOrderStatus(order.id, order.status)}
                                        variant={order.status === 'false' ? 'success' : 'secondary'}
                                        disabled={order.status === 'true'}
                                    >
                                        {order.status === 'false' ? 'Đánh dấu hoàn thành' : 'Đã hoàn thành'}
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

export default ShipperOrders;
