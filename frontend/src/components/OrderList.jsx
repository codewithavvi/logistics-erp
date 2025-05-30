import { useEffect, useState } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/orders')
      .then(response => setOrders(response.data))
      .catch(error => console.error('Error fetching orders:', error));
  }, []);

  const updateStatus = (orderId, status) => {
    axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status })
      .then(response => {
        setOrders(orders.map(order => order.orderId === orderId ? response.data : order));
        setSelectedOrder(null);
      })
      .catch(error => console.error('Error updating status:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Orders</h1>
      <div className="overflow-x-auto">
        <table className="table w-full rounded-lg shadow-lg">
          <thead>
            <tr className="bg-primary text-white">
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={order.orderId} className={index % 2 === 0 ? 'bg-base-100' : 'bg-gray-50'}>
                <td>{order.orderId}</td>
                <td>{order.customerName}</td>
                <td>${order.totalAmount}</td>
                <td>
                  <span className={`badge badge-${order.status === 'Delivered' ? 'success' : 'warning'}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Status Update */}
      {selectedOrder && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Update Order: {selectedOrder.orderId}</h3>
            <select
              className="select select-bordered w-full mt-4"
              value={selectedOrder.status}
              onChange={(e) => setSelectedOrder({ ...selectedOrder, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="modal-action">
              <button
                className="btn btn-primary"
                onClick={() => updateStatus(selectedOrder.orderId, selectedOrder.status)}
              >
                Save
              </button>
              <button className="btn btn-ghost" onClick={() => setSelectedOrder(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderList;