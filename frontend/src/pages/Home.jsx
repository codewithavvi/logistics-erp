import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  return <Dashboard />;
};

export default Home;