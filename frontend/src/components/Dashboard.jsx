import { useEffect, useState, useContext, useMemo } from 'react';
import axios from 'axios';
import { SocketContext } from '../contexts/SocketContext';
import { AuthContext } from '../contexts/AuthContext';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import DatePicker from 'react-datepicker';
import debounce from 'lodash.debounce';

// Register Chart.js components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { orderUpdates } = useContext(SocketContext);
  const [analytics, setAnalytics] = useState({
    totalOrders: 0,
    ordersByStatus: [],
    warehouseStock: [],
  });
  const [filters, setFilters] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    endDate: new Date(),
    status: '',
  });
  const [newUpdates, setNewUpdates] = useState(0);

  // Fetch analytics with filters
  const fetchAnalytics = useMemo(
    () =>
      debounce(async (filters) => {
        try {
          const response = await axios.get('http://localhost:5000/api/analytics', {
            params: {
              startDate: filters.startDate.toISOString(),
              endDate: filters.endDate.toISOString(),
              status: filters.status || undefined,
            },
          });
          setAnalytics(response.data);
        } catch (error) {
          console.error('Error fetching analytics:', error);
        }
      }, 300),
    []
  );

  useEffect(() => {
    fetchAnalytics(filters);
    return () => fetchAnalytics.cancel(); // Cleanup debounce
  }, [filters, fetchAnalytics]);

  // Track new order updates
  useEffect(() => {
    setNewUpdates((prev) => prev + 1);
    const timer = setTimeout(() => setNewUpdates(0), 5000); // Reset badge after 5s
    return () => clearTimeout(timer);
  }, [orderUpdates]);

  // Pie chart data for orders by status
  const pieChartData = useMemo(
    () => ({
      labels: analytics.ordersByStatus.map((status) => status._id),
      datasets: [
        {
          data: analytics.ordersByStatus.map((status) => status.count),
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6'],
          hoverOffset: 20,
        },
      ],
    }),
    [analytics.ordersByStatus]
  );

  // Bar chart data for warehouse stock
  const barChartData = useMemo(
    () => ({
      labels: analytics.warehouseStock.map((warehouse) => warehouse.name),
      datasets: [
        {
          label: 'Current Stock',
          data: analytics.warehouseStock.map((warehouse) => warehouse.currentStock),
          backgroundColor: '#1E3A8A',
        },
        {
          label: 'Capacity',
          data: analytics.warehouseStock.map((warehouse) => warehouse.capacity),
          backgroundColor: '#10B981',
        },
      ],
    }),
    [analytics.warehouseStock]
  );

  // Custom CSV export function
  const exportToCSV = () => {
    const headers = ['Metric,Value'];
    const rows = [
      `Total Orders,${analytics.totalOrders}`,
      ...analytics.ordersByStatus.map((status) => `Orders (${status._id}),${status.count}`),
      ...analytics.warehouseStock.map((warehouse) => `${warehouse.name} Stock,${warehouse.currentStock}/${warehouse.capacity}`),
    ];
    const csvContent = [...headers, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'dashboard_analytics.csv');
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-accent min-h-screen" aria-label="Dashboard">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <button
          onClick={exportToCSV}
          className="btn btn-secondary"
          aria-label="Export Analytics as CSV"
        >
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="card bg-white shadow-lg p-4 mb-6 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-4">
          <div>
            <label className="label" htmlFor="start-date">Start Date</label>
            <DatePicker
              id="start-date"
              selected={filters.startDate}
              onChange={(date) => setFilters({ ...filters, startDate: date })}
              className="input input-bordered w-full"
              dateFormat="yyyy-MM-dd"
              aria-label="Select Start Date"
            />
          </div>
          <div>
            <label className="label" htmlFor="end-date">End Date</label>
            <DatePicker
              id="end-date"
              selected={filters.endDate}
              onChange={(date) => setFilters({ ...filters, endDate: date })}
              className="input input-bordered w-full"
              dateFormat="yyyy-MM-dd"
              aria-label="Select End Date"
            />
          </div>
          <div>
            <label className="label" htmlFor="status-filter">Status</label>
            <select
              id="status-filter"
              className="select select-bordered w-full"
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              aria-label="Filter by Order Status"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="stat bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform">
          <div className="stat-title text-white">Total Orders</div>
          <div className="stat-value">{analytics.totalOrders}</div>
        </div>
        <div className="stat bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform">
          <div className="stat-title text-white">Active Warehouses</div>
          <div className="stat-value">{analytics.warehouseStock.length}</div>
        </div>
        <div className="stat bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg rounded-lg p-4 hover:scale-105 transition-transform relative">
          <div className="stat-title text-white">Order Updates</div>
          <div className="stat-value">{orderUpdates.length}</div>
          {newUpdates > 0 && (
            <span className="badge badge-secondary absolute top-2 right-2 animate-pulse">
              {newUpdates} New
            </span>
          )}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card bg-white shadow-lg p-4 animate-fade-in">
          <h2 className="text-2xl mb-4 text-neutral">Orders by Status</h2>
          <div className="h-64">
            <Pie
              data={pieChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } },
              }}
              aria-label="Pie Chart of Orders by Status"
            />
          </div>
        </div>
        <div className="card bg-white shadow-lg p-4 animate-fade-in">
          <h2 className="text-2xl mb-4 text-neutral">Warehouse Stock</h2>
          <div className="h-64">
            <Bar
              data={barChartData}
              options={{
                responsive: true,
                plugins: { legend: { position: 'bottom' }, tooltip: { enabled: true } },
                scales: { y: { beginAtZero: true } },
              }}
              aria-label="Bar Chart of Warehouse Stock Levels"
            />
          </div>
        </div>
      </div>

      {/* Real-Time Order Updates */}
      <div className="card bg-white shadow-lg p-4 animate-fade-in">
        <h2 className="text-2xl mb-4 text-neutral">Recent Order Updates</h2>
        <div className="max-h-64 overflow-y-auto">
          <ul className="space-y-2">
            {orderUpdates.slice(0, 10).map((update, index) => (
              <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                <span className="font-semibold">Order {update.orderId}</span>
                changed to
                <span className="badge badge-secondary">{update.status}</span>
                <span className="text-sm text-neutral">
                  {new Date(update.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;