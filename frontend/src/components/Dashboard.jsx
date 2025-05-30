import { useEffect, useState, useContext } from 'react';
   import axios from 'axios';
   import { SocketContext } from '../contexts/SocketContext';

   const Dashboard = () => {
     const { orderUpdates } = useContext(SocketContext);
     const [analytics, setAnalytics] = useState({ totalOrders: 0, ordersByStatus: [], warehouseStock: [] });

     useEffect(() => {
       axios.get('http://localhost:5000/api/analytics')
         .then(response => setAnalytics(response.data))
         .catch(error => console.error('Error fetching analytics:', error));
     }, []);

     return (
       <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
         <div className="stats shadow">
           <div className="stat">
             <div className="stat-title">Total Orders</div>
             <div className="stat-value">{analytics.totalOrders}</div>
           </div>
         </div>
         <h2 className="text-xl font-bold mt-4">Orders by Status</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {analytics.ordersByStatus.map((status, index) => (
             <div key={index} className="card bg-base-100 shadow">
               <div className="card-body">
                 <h3 className="card-title">{status._id}</h3>
                 <p>{status.count} orders</p>
               </div>
             </div>
           ))}
         </div>
         <h2 className="text-xl font-bold mt-4">Warehouse Stock</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {analytics.warehouseStock.map((warehouse, index) => (
             <div key={index} className="card bg-base-100 shadow">
               <div className="card-body">
                 <h3 className="card-title">{warehouse.name}</h3>
                 <p>Stock: {warehouse.currentStock}/{warehouse.capacity}</p>
               </div>
             </div>
           ))}
         </div>
         <h2 className="text-xl font-bold mt-4">Recent Order Updates</h2>
         <ul className="list-disc pl-5">
           {orderUpdates.map((update, index) => (
             <li key={index}>
               Order {update.orderId} changed to {update.status}
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default Dashboard;