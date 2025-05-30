import { useEffect, useState } from 'react';
   import axios from 'axios';

   const VehicleList = () => {
     const [vehicles, setVehicles] = useState([]);

     useEffect(() => {
       axios.get('http://localhost:5000/api/vehicles')
         .then(response => setVehicles(response.data))
         .catch(error => console.error('Error fetching vehicles:', error));
     }, []);

     return (
       <div className="p-4">
         <h1 className="text-2xl font-bold mb-4">Vehicles</h1>
         <div className="overflow-x-auto">
           <table className="table w-full">
             <thead>
               <tr>
                 <th>Vehicle ID</th>
                 <th>Type</th>
                 <th>Capacity</th>
                 <th>Status</th>
                 <th>Driver</th>
               </tr>
             </thead>
             <tbody>
               {vehicles.map(vehicle => (
                 <tr key={vehicle._id}>
                   <td>{vehicle.vehicleId}</td>
                   <td>{vehicle.type}</td>
                   <td>{vehicle.capacity}</td>
                   <td>{vehicle.status}</td>
                   <td>{vehicle.driver?.name || 'Unassigned'}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     );
   };

   export default VehicleList;