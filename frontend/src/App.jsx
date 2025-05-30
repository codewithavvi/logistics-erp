import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import WarehouseList from './components/WarehouseList';
import VehicleList from './components/VehicleList';
import DriverList from './components/DriverList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {children}
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/orders" element={<ProtectedRoute><OrderList /><OrderForm /></ProtectedRoute>} />
            <Route path="/warehouses" element={<ProtectedRoute><WarehouseList /></ProtectedRoute>} />
            <Route path="/vehicles" element={<ProtectedRoute><VehicleList /></ProtectedRoute>} />
            <Route path="/drivers" element={<ProtectedRoute><DriverList /></ProtectedRoute>} />
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
}

export default App;