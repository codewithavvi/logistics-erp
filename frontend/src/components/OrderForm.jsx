import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    items: [{ name: '', quantity: 1, price: 0 }],
    totalAmount: 0,
    warehouseId: '',
    driverId: '',
  });
  const [warehouses, setWarehouses] = useState([]);
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/warehouses')
      .then(res => setWarehouses(res.data))
      .catch(err => console.error('Error fetching warehouses:', err));
    axios.get('http://localhost:5000/api/drivers')
      .then(res => setDrivers(res.data))
      .catch(err => console.error('Error fetching drivers:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/orders', formData);
      alert('Order created successfully!');
      setFormData({
        customerName: '',
        items: [{ name: '', quantity: 1, price: 0 }],
        totalAmount: 0,
        warehouseId: '',
        driverId: '',
      });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order.');
    }
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    const totalAmount = newItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setFormData({ ...formData, items: newItems, totalAmount });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { name: '', quantity: 1, price: 0 }],
    });
  };

  return (
    <div className="p-6">
      <h3 className="text-2xl mb-6 text-primary">Create New Order</h3>
      <div className="card bg-white shadow-lg p-6 animate-fade-in">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Customer Name"
            className="input input-bordered w-full"
            value={formData.customerName}
            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
            required
          />
          <h4 className="text-lg font-medium text-neutral">Items</h4>
          {formData.items.map((item, index) => (
            <div key={index} className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Item Name"
                className="input input-bordered flex-1"
                value={item.name}
                onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                className="input input-bordered w-24"
                value={item.quantity}
                onChange={(e) => handleItemChange(index, 'quantity', Number(e.target.value))}
                min="1"
                required
              />
              <input
                type="number"
                placeholder="Price"
                className="input input-bordered w-24"
                value={item.price}
                onChange={(e) => handleItemChange(index, 'price', Number(e.target.value))}
                min="0"
                step="0.01"
                required
              />
            </div>
          ))}
          <button
            type="button"
            className="btn btn-outline btn-secondary"
            onClick={addItem}
          >
            Add Item
          </button>
          <select
            className="select select-bordered w-full"
            value={formData.warehouseId}
            onChange={(e) => setFormData({ ...formData, warehouseId: e.target.value })}
            required
          >
            <option value="">Select Warehouse</option>
            {warehouses.map(warehouse => (
              <option key={warehouse._id} value={warehouse._id}>{warehouse.name}</option>
            ))}
          </select>
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
          <div className="text-lg font-medium text-neutral">
            Total: ${formData.totalAmount.toFixed(2)}
          </div>
          <button type="submit" className="btn btn-primary w-full">Create Order</button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;