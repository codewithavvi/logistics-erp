import { useState, useContext } from 'react';
   import { AuthContext } from '../contexts/AuthContext';
   import { useNavigate } from 'react-router-dom';

   const Login = () => {
     const { login } = useContext(AuthContext);
     const navigate = useNavigate();
     const [formData, setFormData] = useState({ email: '', password: '' });
     const [error, setError] = useState('');

     const handleSubmit = async (e) => {
       e.preventDefault();
       try {
         await login(formData.email, formData.password);
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
               <h2 className="card-title">Login</h2>
               {error && <div className="alert alert-error">{error}</div>}
               <form onSubmit={handleSubmit} className="form-control">
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
                 <button type="submit" className="btn btn-primary">Login</button>
               </form>
             </div>
           </div>
         </div>
       </div>
     );
   };

   export default Login;