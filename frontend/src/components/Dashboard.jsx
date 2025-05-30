import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { SocketContext } from '../contexts/SocketContext';

const Dashboard = () => {
  const { orderUpdates } = useContext(SocketContext);
  const [analytics, setAnalytics] = useState({ totalOrders: 0, ordersByStatus: [], warehouseStock: [] });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/analytics')
      .then(response => setAnalytics(response.data))
      .catch(error => console.error('Error fetching analytics:', error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="stat bg-white shadow-lg rounded-lg p-4">
          <div className="stat-title">Total Orders</div>
          <div className="stat-value text-primary">{analytics.totalOrders}</div>
        </div>
        <div className="stat bg-white shadow-lg rounded-lg p-4">
          <div className="stat-title">Active Warehouses</div>
          <div className="stat-value text-primary">{analytics.warehouseStock.length}</div>
        </div>
        <div className="stat bg-white shadow-lg rounded-lg p-4">
          <div className="stat-title">Order Updates</div>
          <div className="stat-value text-primary cursor-pointer" onClick={() => setShowModal(true)}>
            {orderUpdates.length}
          </div>
        </div>
      </div>
      <h2 className="text-2xl mb-4">Orders by Status</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {analytics.ordersByStatus.map((status, index) => (
          <div key={index} className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title">{status._id}</h3>
              <p className="text-neutral">{status.count} orders</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl mb-4">Warehouse Stock</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analytics.warehouseStock.map((warehouse, index) => (
          <div key={index} className="card bg-white shadow-lg">
            <div className="card-body">
              <h3 className="card-title">{warehouse.name}</h3>
              <p className="text-neutral">Stock: {warehouse.currentStock}/{warehouse.capacity}</p>
              <progress
                className="progress progress-secondary"
                value={(warehouse.currentStock / warehouse.capacity) * 100}
                max="100"
              ></progress>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Order Updates */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Recent Order Updates</h3>
            <ul className="py-4">
              {orderUpdates.map((update, index) => (
                <li key={index} className="mb-2">
                  Order <span className="font-semibold">{update.orderId}</span> changed to{' '}
                  <span className="badge badge-secondary">{update.status}</span>
                </li>
              ))}
            </ul>
            <div className="modal-action">
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;