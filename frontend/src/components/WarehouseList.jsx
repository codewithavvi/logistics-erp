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
    <div className="p-6">
      <h1 className="text-3xl mb-6">Warehouses</h1>
      <div className="overflow-x-auto">
        <table className="table w-full rounded-lg shadow-lg">
          <thead>
            <tr className="bg-primary text-white">
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Current Stock</th>
            </tr>
          </thead>
          <tbody>
            {warehouses.map((warehouse, index) => (
              <tr key={warehouse._id} className={index % 2 === 0 ? 'bg-base-100' : 'bg-gray-50'}>
                <td>{warehouse.name}</td>
                <td>{warehouse.location}</td>
                <td>{warehouse.capacity}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <span>{warehouse.currentStock}</span>
                    <progress
                      className="progress progress-secondary w-24"
                      value={(warehouse.currentStock / warehouse.capacity) * 100}
                      max="100"
                    ></progress>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WarehouseList;