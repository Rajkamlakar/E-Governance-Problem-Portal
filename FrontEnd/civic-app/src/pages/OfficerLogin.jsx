// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { authService } from '../services/authService';
// import { useApp } from '../context/AppContext';

// const OfficerLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useApp();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       const response = await authService.login({ email, password });
      
//       // Use the AppContext login function to properly integrate with the app
//       login(response.user || response);
      
//       navigate('/officer/dashboard');
//     } catch (err) {
//       setError(err.message || 'Login failed. Please check your credentials.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">Officer Login</h2>
//           <p className="text-gray-600 mt-2">Municipal Ward Issue System</p>
//         </div>
        
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Email Address
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="officer@civic.com"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="••••••••"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               required
//               disabled={loading}
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
//           >
//             {loading ? 'Logging in...' : 'Login'}
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm text-gray-600">
//           <p>Test credentials:</p>
//           <p className="font-semibold">admin@civic.com / admin123</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OfficerLogin;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useApp } from '../context/AppContext';

// ✅ List of officers allowed to log in
const allowedOfficers = [
  { email: 'officer1@civic.com', password: 'officer123' },
  { email: 'officer2@civic.com', password: 'officer456' },
  { email: 'admin@civic.com', password: 'admin123' },
];

const OfficerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // ✅ Check if entered credentials match allowed officers
    const officer = allowedOfficers.find(
      (o) => o.email === email && o.password === password
    );

    if (!officer) {
      setError('Access denied. Only authorized officers can log in.');
      setLoading(false);
      return;
    }

    try {
      // Simulate authentication using your existing authService
      const response = await authService.login({ email, password });
      
      // Update global state using AppContext
      login(response.user || response);

      // Redirect to officer dashboard
      navigate('/officer/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Officer Login</h2>
          <p className="text-gray-600 mt-2">Municipal Ward Issue System</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="officer@civic.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* ✅ Show allowed officer credentials for testing */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Allowed Officers:</p>
          {allowedOfficers.map((officer, i) => (
            <p key={i} className="font-semibold">
              {officer.email} / {officer.password}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficerLogin;
