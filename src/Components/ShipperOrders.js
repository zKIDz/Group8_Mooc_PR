import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './ShipperOrders.css';

const ShipperOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:9999/orders');
        const ordersData = response.data;

        // Fetch user details for each order
        const updatedOrders = await Promise.all(
          ordersData.map(async (order) => {
            const userResponse = await axios.get(`http://localhost:9999/users/${order.customerId}`);
            return {
              ...order,
              user: userResponse.data,
            };
          })
        );

        setOrders(updatedOrders);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, currentStatus) => {
    const confirmation = window.confirm('Are you sure you want to change the status of this order?');
    if (!confirmation) {
      return;
    }

    try {
      await axios.patch(`http://localhost:9999/orders/${orderId}`, { status: !currentStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? { ...order, status: !currentStatus } : order))
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="shipper-orders">
      <h2>Order List for Shippers</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user?.fullName || 'N/A'}</td> {/* Changed name to fullName */}
              <td>{order.user?.address || 'N/A'}</td>
              <td>{order.user?.phoneNumber || 'N/A'}</td> {/* Changed phone to phoneNumber */}
              <td>${order.total.toFixed(2)}</td>
              <td>{order.status === 'false' ? 'Đang xử lý' : 'Hoàn thành'}</td>
              <td>
                <Button as={Link} to={`/order-details/${order.id}`} variant="info" className="me-2">
                  Xem chi tiết
                </Button>
                <Button
                  onClick={() => updateOrderStatus(order.id, order.status === 'false')}
                  variant={order.status === 'false' ? 'success' : 'secondary'}
                >
                  {order.status === 'false' ? 'Đánh dấu hoàn thành' : 'Đã hoàn thành'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipperOrders;
