import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.avif';
import signupPhoto from '../assets/loginphoto4.jpg';

const SignUp = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // For redirecting to OTP page

    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      const payload = { fullName, email, password, role };
      console.log('Sending payload:', payload); // Debugging line
  
      try {
          const response = await fetch('http://localhost:8080/auth/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(payload),
          });
  
          console.log('Response received:', response); // Debugging line
          const result = await response.json();
          console.log('Result from API:', result); // Debugging line
  
          if (response.ok) {
              navigate('/verify-otp', { state: { email } });
          } else {
              setError(result.message || 'Something went wrong!');
          }
      } catch (err) {
          console.error('Error during registration:', err); // Debugging line
          setError('Failed to register. Please try again.');
      }
  };
  
    return (
        <div className='flex p-4'>
            <div className='w-2/4'>
                <img src={signupPhoto} className='w-full' alt="Sign Up" />
            </div>
            <div className='w-full'>
                <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-700 to-gray-900 p-2">
                    <div className='flex'>
                        <img src={logo} alt="Study With Me Logo" className="w-40 mb-2" />
                        <Link to='/'>
                            <button className="text-black text-xl rounded-full p-1 relative left-64 cursor-pointer">❌</button>
                        </Link>
                    </div>
                    <div className="bg-white shadow-2xl rounded-lg p-4 max-w-md w-full flex flex-col justify-between">
                        <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">Sign Up for <span className='font-bold text-2xl'>Study With Me</span></h2>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="mb-2">
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Enter your Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700">Role</label>
                                <select
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value="student">Student</option>
                                    <option value="instructor">Instructor</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <input type="checkbox" id="terms" required />
                                <label htmlFor="terms" className="text-sm text-gray-700 ml-2">I accept the <Link to="/terms" className="text-blue-500 hover:underline">terms and conditions</Link></label>
                            </div>
                            {error && <div className="text-red-600 mb-2">{error}</div>}
                            <button className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
