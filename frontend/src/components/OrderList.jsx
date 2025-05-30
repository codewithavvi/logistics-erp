import { useEffect, useState } from 'react';
   import axios from 'axios';

   const OrderList = () => {
     const [orders, setOrders] = useState([]);

     useEffect(() => {
       axios.get('http://localhost:5000/api/orders')
         .then(response => setOrders(response.data))
         .catch(error => console.error('Error fetching orders:', error));
     }, []);

     const updateStatus = (orderId, status) => {
       axios.put(`http://localhost:5000/api/orders/${orderId}/status`, { status })
         .then(response => {
           setOrders(orders.map(order => order.orderId === orderId ? response.data : order));
         })
         .catch(error => console.error('Error updating status:', error));
     };

     return (
       <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Orders</h1>
         <div className="overflow-x-auto">
           <table className="table w-full">
             <thead>
               <tr>
                 <th>Order ID</th>
                 <th>Customer</th>
                 <th>Total Amount</th>
                 <th>Status</th>
                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
               {orders.map(order => (
                 <tr key={order.orderId}>
                   <td>{order.orderId}</td>
                   <td>{order.customerName}</td>
                   <td>${order.totalAmount}</td>
                   <td>{order.status}</td>
                   <td>
                     <select
                       className="select select-bordered"
                       value={order.status}
                       onChange={(e) => updateStatus(order.orderId, e.target.value)}
                     >
                       <option value="Pending">Pending</option>
                       <option value="Processing">Processing</option>
                       <option value="Shipped">Shipped</option>
                       <option value="Delivered">Delivered</option>
                       <option value="Cancelled">Cancelled</option>
                     </select>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     );
   };

   export default OrderList;