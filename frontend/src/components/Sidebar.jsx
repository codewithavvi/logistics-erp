import { Link } from 'react-router-dom';
   import { useContext } from 'react';
   import { AuthContext } from '../contexts/AuthContext';
   import { FaHome, FaBox, FaWarehouse, FaTruck, FaUser } from 'react-icons/fa';

   const Sidebar = () => {
     const { user } = useContext(AuthContext);

     return (
       <div className="w-64 bg-white h-screen shadow-lg">
         <div className="p-4">
           <h2 className="text-lg font-semibold text-primary">Menu</h2>
           <ul className="menu mt-4">
             <li>
               <Link to="/" className="flex items-center gap-2 hover:bg-accent animate-slide-in">
                 <FaHome /> Dashboard
               </Link>
             </li>
             <li>
               <Link to="/orders" className="flex items-center gap-2 hover:bg-accent animate-slide-in">
                 <FaBox /> Orders
               </Link>
             </li>
             <li>
               <Link to="/warehouses" className="flex items-center gap-2 hover:bg-accent animate-slide-in">
                 <FaWarehouse /> Warehouses
               </Link>
             </li>
             <li>
               <Link to="/vehicles" className="flex items-center gap-2 hover:bg-accent animate-slide-in">
                 <FaTruck /> Vehicles
               </Link>
             </li>
             <li>
               <Link to="/drivers" className="flex items-center gap-2 hover:bg-accent animate-slide-in">
                 <FaUser /> Drivers
               </Link>
             </li>
             {user?.role === 'Admin' && (
               <li>
                 <Link to="/register" className="flex items-center gap-2 hover:bg-accent animate-slide-in">
                   <FaUser /> Register User
                 </Link>
               </li>
             )}
           </ul>
         </div>
       </div>
     );
   };

   export default Sidebar;