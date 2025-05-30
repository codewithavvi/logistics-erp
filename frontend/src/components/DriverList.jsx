
import { useEffect, useState } from 'react';
   import axios from 'axios';

   const DriverList = () => {
     const [drivers, setDrivers] = useState([]);
     const [vehicles, setVehicles] = useState([]);
     const [formData, setFormData] = useState({ driverId: '', vehicleId: '' });

     useEffect(() => {
       axios.get('http://localhost:5000/api/drivers').then(res => setDrivers(res.data));
       axios.get('http://localhost:5000/api/vehicles').then(res => setVehicles(res.data));
     }, []);

     const handleAssign = async (e) => {
       e.preventDefault();
       try {
         await axios.post('http://localhost:5000/api/drivers/assign', formData);
         alert('Driver assigned!');
         axios.get('http://localhost:5000/api/drivers').then(res => setDrivers(res.data));
         setFormData({ driverId: '', vehicleId: '' });
       } catch (error) {
         console.error('Error assigning driver:', error);
       }
     };

     return (
       <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Drivers</h1>
         <form onSubmit={handleAssign} className="form-control mb-4">
           <select
             className="select select-bordered mb-2"
             value={formData.driverId}
             onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
           >
             <option value="">Select Driver</option>
             {drivers.map(driver => (
               <option key={driver._id} value={driver._id}>{driver.name}</option>
             ))}
           </select>
           <select
             className="select select-bordered mb-2"
             value={formData.vehicleId}
             onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
           >
             <option value="">Select Vehicle</option>
             {vehicles.map(vehicle => (
               <option key={vehicle._id} value={vehicle.vehicleId}>{vehicle.vehicleId}</option>
             ))}
           </select>
           <button type="submit" className="btn btn-primary">Assign Driver</button>
         </form>
         <div className="overflow-x-auto">
           <table className="table w-full">
             <thead>
               <tr>
                 <th>Name</th>
                 <th>License Number</th>
                 <th>Status</th>
                 <th>Vehicle</th>
               </tr>
             </thead>
             <tbody>
               {drivers.map(driver => (
                 <tr key={driver._id}>
                   <td>{driver.name}</td>
                   <td>{driver.licenseNumber}</td>
                   <td>{driver.status}</td>
                   <td>{driver.vehicle?.vehicleId || 'Unassigned'}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     );
   };

   export default DriverList;