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
    <div className="p-6">
      <h1 className="text-3xl mb-6 text-primary">Vehicles</h1>
      <div className="overflow-x-auto rounded-lg shadow-lg animate-fade-in">
        <table className="table w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th>Vehicle ID</th>
              <th>Type</th>
              <th>Capacity</th>
              <th>Status</th>
              <th>Driver</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr key={vehicle._id} className={index % 2 === 0 ? 'bg-base-100' : 'bg-gray-50'}>
                <td>{vehicle.vehicleId}</td>
                <td>{vehicle.type}</td>
                <td>{vehicle.capacity}</td>
                <td>
                  <span className={`badge badge-${vehicle.status === 'Available' ? 'success' : 'warning'}`}>
                    {vehicle.status}
                  </span>
                </td>
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