
import { useState, useContext } from 'react';
   import { AuthContext } from '../contexts/AuthContext';
   import { useNavigate } from 'react-router-dom';

   const Register = () => {
     const { register } = useContext(AuthContext);
     const navigate = useNavigate();
     const [formData, setFormData] = useState({ username: '', email: '', password: '', role: 'Manager' });
     const [error, setError] = useState('');

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         await register(formData.username, formData.email, formData.password, formData.role);
         navigate('/');
       } catch (err) {
         setError(err.message);
       }
     };

     return (
       <div className="hero min-h-screen bg-base-200">
         <div className="hero-content flex-col">
           <div className="card w-96 bg-base-100 shadow-xl">
             <div className="card-body">
               <h2 className="card-title">Register</h2>
               {error && <div className="alert alert-error">{error}</div>}
               <form onSubmit={handleSubmit} className="form-control">
                 <input
                   type="text"
                   placeholder="Username"
                   className="input input-bordered mb-2"
                   value={formData.username}
                   onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                 />
                 <input
                   type="email"
                   placeholder="Email"
                   className="input input-bordered mb-2"
                   value={formData.email}
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                 />
                 <input
                   type="password"
                   placeholder="Password"
                   className="input input-bordered mb-2"
                   value={formData.password}
                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                 />
                 <select
                   className="select select-bordered mb-2"
                   value={formData.role}
                   onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                 >
                   <option value="Admin">Admin</option>
                   <option value="Manager">Manager</option>
                   <option value="Driver">Driver</option>
                 </select>
                 <button type="submit" className="btn btn-primary">Register</button>
               </form>
             </div>
           </div>
         </div>
       </div>
     );
   };

   export default Register;