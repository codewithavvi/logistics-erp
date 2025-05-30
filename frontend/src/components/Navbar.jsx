import { useContext } from 'react';
   import { AuthContext } from '../contexts/AuthContext';
   import { Link } from 'react-router-dom';

   const Navbar = () => {
     const { user, logout } = useContext(AuthContext);

     return (
       <div className="navbar bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg">
         <div className="flex-1">
           <Link to="/" className="btn btn-ghost text-xl hover:bg-blue-800">Logistics ERP</Link>
         </div>
         <div className="flex-none">
           {user ? (
             <div className="dropdown dropdown-end">
               <label tabIndex={0} className="btn btn-ghost hover:bg-blue-800">
                 <div className="flex items-center gap-2">
                   <span>{user.username}</span>
                   <span className="badge badge-secondary">{user.role}</span>
                 </div>
               </label>
               <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-neutral">
                 <li><button onClick={logout} className="hover:bg-accent">Logout</button></li>
               </ul>
             </div>
           ) : (
             <Link to="/login" className="btn btn-secondary">Login</Link>
           )}
         </div>
       </div>
     );
   };

   export default Navbar;