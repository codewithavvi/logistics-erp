import { useEffect, useState } from 'react';
   import axios from 'axios';

   const WarehouseList = () => {
     const [warehouses, setWarehouses] = useState([]);

     useEffect(() => {
       axios.get('http://localhost:5000/api/warehouses')
         .then(response => setWarehouses(response.data))
         .catch(error => console.error('Error fetching warehouses:', error));
     }, []);

     return (
       <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Warehouses</h1>
         <div className="overflow-x-auto">
           <table className="table w-full">
             <thead>
               <tr>
                 <th>Name</th>
                 <th>Location</th>
                 <th>Capacity</th>
                 <th>Current Stock</th>
               </tr>
             </thead>
             <tbody>
               {warehouses.map(warehouse => (
                 <tr key={warehouse._id}>
                   <td>{warehouse.name}</td>
                   <td>{warehouse.location}</td>
                   <td>{warehouse.capacity}</td>
                   <td>{warehouse.currentStock}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     );
   };

   export default WarehouseList;