import { useContext } from 'react';
   import { AuthContext } from '../contexts/AuthContext';
   import { Navigate } from 'react-router-dom';
   import Dashboard from '../components/Dashboard';
   import Sidebar from '../components/Sidebar';
   import Navbar from '../components/Navbar';

   const Home = () => {
     const { user } = useContext(AuthContext);

     if (!user) return <Navigate to="/login" />;

     return (
       <div className="flex">
         <Sidebar />
         <div className="flex-1">
           <Navbar />
           <Dashboard />
         </div>
       </div>
     );
   };

   export default Home;