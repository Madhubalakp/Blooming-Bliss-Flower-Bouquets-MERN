// OrderSummary.js

import React, { useEffect, useState } from 'react';
import './Order.css'; 

const OrderSummary = () => {
    const [orders, setOrders] = useState([]); // State to store orders
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('http://localhost:9001/api/Products'); // Fetch orders from server
                if (!response.ok) {
                    throw new Error('Failed to fetch orders');
                }
                const data = await response.json();
                setOrders(data); // Set the fetched orders to state
            } catch (err) {
                setError(err.message); // Set error message
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchOrders(); // Call the fetch function
    }, []);

    if (loading) return <div>Loading...</div>; // Show loading message
    if (error) return <div>Error: {error}</div>; // Show error message

    return (
        <div className="order-summary-container">
            <h1>Order Summary</h1>
            <div className="orders-list">
                {orders.length > 0 ? (
                    orders.map(order => (
                        <div className="order-item" key={order._id}>
                            <h2>{order.flowerName}</h2>
                            <p>Quantity: {order.quantity}</p>
                            <p>Price per Unit: ${order.pricePerUnit.toFixed(2)}</p>
                            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                            <p>Phone Number: {order.orderPhoneNumber}</p>
                            <p>Date: {order.orderDate}</p>
                            <p>Time: {order.orderTime}</p>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrderSummary;
