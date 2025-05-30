import { useContext } from 'react';
   import { AuthContext } from '../contexts/AuthContext';
   import { Link } from 'react-router-dom';

   const Navbar = () => {
     const { user, logout } = useContext(AuthContext);

     return (
       <div className="navbar bg-base-100 shadow">
         <div className="flex-1">
           <Link to="/" className="btn btn-ghost text-xl">Logistics ERP</Link>
         </div>
         <div className="flex-none">
           {user ? (
             <div className="dropdown dropdown-end">
               <label tabIndex={0} className="btn btn-ghost">
                 {user.username} ({user.role})
               </label>
               <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                 <li><button onClick={logout}>Logout</button></li>
               </ul>
             </div>
           ) : (
             <Link to="/login" className="btn btn-ghost">Login</Link>
           )}
         </div>
       </div>
     );
   };

   export default Navbar;   