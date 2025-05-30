import { useEffect, useState } from 'react';
import axios from 'axios';

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({ driverId: '', vehicleId: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/api/drivers')
      .then(res => setDrivers(res.data))
      .catch(err => console.error('Error fetching drivers:', err));
    axios.get('http://localhost:5000/api/vehicles')
      .then(res => setVehicles(res.data))
      .catch(err => console.error('Error fetching vehicles:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/drivers/assign', formData);
      alert('Driver assigned successfully!');
      axios.get('http://localhost:5000/api/drivers')
        .then(res => setDrivers(res.data));
      setFormData({ driverId: '', vehicleId: '' });
    } catch (error) {
      console.error('Error assigning driver:', error);
      alert('Failed to assign driver.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6 text-primary">Drivers</h1>
      <div className="card bg-white shadow-lg p-6 mb-6 animate-fade-in">
        <form onSubmit={handleSubmit} className="form-control space-y-4">
          <select
            className="select select-bordered w-full"
            value={formData.driverId}
            onChange={(e) => setFormData({ ...formData, driverId: e.target.value })}
            required
          >
            <option value="">Select Driver</option>
            {drivers.map(driver => (
              <option key={driver._id} value={driver._id}>{driver.name}</option>
            ))}
          </select>
          <select
            className="select select-bordered w-full"
            value={formData.vehicleId}
            onChange={(e) => setFormData({ ...formData, vehicleId: e.target.value })}
            required
          >
            <option value="">Select Vehicle</option>
            {vehicles.map(vehicle => (
              <option key={vehicle._id} value={vehicle.vehicleId}>{vehicle.vehicleId}</option>
            ))}
          </select>
          <button type="submit" className="btn btn-primary">Assign Driver</button>
        </form>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-primary text-white">
              <th>Name</th>
              <th>License Number</th>
              <th>Status</th>
              <th>Vehicle</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver, index) => (
              <tr key={driver._id} className={index % 2 === 0 ? 'bg-base-100' : 'bg-gray-50'}>
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