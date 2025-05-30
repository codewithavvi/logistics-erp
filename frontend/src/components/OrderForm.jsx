
import { useState, useEffect } from 'react';
   import axios from 'axios';

   const OrderForm = () => {
     const [formData, setFormData] = useState({
       customerName: '',
       items: [{ name: '', quantity: 0, price: 0 }],
       totalAmount: 0,
       warehouse: '',
       driver: ''
     });
     const [warehouses, setWarehouses] = useState([]);
     const [drivers, setDrivers] = useState([]);

     useEffect(() => {
       axios.get('http://localhost:5000/api/warehouses').then(res => setWarehouses(res.data));
       axios.get('http://localhost:5000/api/drivers').then(res => setDrivers(res.data));
     }, []);

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         await axios.post('http://localhost:5000/api/orders', formData);
         alert('Order created!');
         setFormData({ customerName: '', items: [{ name: '', quantity: 0, price: 0 }], totalAmount: 0, warehouse: '', driver: '' });
       } catch (error) {
         console.error('Error creating order:', error);
       }
     };

     const handleItemChange = (index, field, value) => {
       const newItems = [...formData.items];
       newItems[index][field] = value;
       setFormData({
         ...formData,
         items: newItems,
         totalAmount: newItems.reduce((sum, item) => sum + item.quantity * item.price, 0)
       });
     };

     return (
       <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Create Order</h1>
         <form onSubmit={handleSubmit} className="form-control">
           <input
             type="text"
             placeholder="Customer Name"
             className="input input-bordered mb-2"
             value={formData.customerName}
             onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
           />
           {formData.items.map((item, index) => (
             <div key={index} className="flex gap-2 mb-2">
               <input
                 type="text"
                 placeholder="Item Name"
                 className="input input-bordered"
                 value={item.name}
                 onChange={(e) => handleItemChange(index, 'name', e.target.value)}
               />
               <input
                 type="number"
                 placeholder="Quantity"
                 className="input input-bordered"
                 value={item.quantity}
                 onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
               />
               <input
                 type="number"
                 placeholder="Price"
                 className="input input-bordered"
                 value={item.price}
                 onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
               />
             </div>
           ))}
           <select
             className="select select-bordered mb-2"
             value={formData.warehouse}
             onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
           >
             <option value="">Select Warehouse</option>
             {warehouses.map(warehouse => (
               <option key={warehouse._id} value={warehouse._id}>{warehouse.name}</option>
             ))}
           </select>
           <select
             className="select select-bordered mb-2"
             value={formData.driver}
             onChange={(e) => setFormData({ ...formData, driver: e.target.value })}
           >
             <option value="">Select Driver</option>
             {drivers.map(driver => (
               <option key={driver._id} value={driver._id}>{driver.name}</option>
             ))}
           </select>
           <button type="submit" className="btn btn-primary">Create Order</button>
         </form>
       </div>
     );
   };

   export default OrderForm;