import { Link } from 'react-router-dom';
   import { useContext } from 'react';
   import { AuthContext } from '../contexts/AuthContext';

   const Sidebar = () => {
     const { user } = useContext(AuthContext);

     return (
       <div className="w-64 bg-base-200 h-screen p-4">
         <ul className="menu">
           <li><Link to="/">Dashboard</Link></li>
           <li><Link to="/orders">Orders</Link></li>
           <li><Link to="/warehouses">Warehouses</Link></li>
           <li><Link to="/vehicles">Vehicles</Link></li>
           <li><Link to="/drivers">Drivers</Link></li>
           {user?.role === 'Admin' && <li><Link to="/register">Register User</Link></li>}
         </ul>
       </div>
     );
   };

   export default Sidebar;