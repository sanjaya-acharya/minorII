import React from 'react';
// import { useState } from 'react';
// import axios from 'axios';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Dashboard from './components/Dashboard';
import './App.css';

export default function App() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // Prepare the request body
  //   const requestBody = {
  //     email: email,
  //     password: password
  //   };

  //   // Send the POST request using axios
  //   axios.post('http://localhost:4000/api/account/login', requestBody)
  //     .then(response => {
  //       // Handle the response data
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       // Handle any errors
  //       console.error(error);
  //     });
  // };

  return (
      <div className="App">
        <div className="navbar">
          <Link to="/">Home</Link>
          <Link to="/about">About us</Link>
          <Link to="/contact">Contact us</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  );
}


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   // State to track user authentication status
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Your authentication logic to determine if the user is authenticated or not
//   // For example, you might check the presence of a token or session
//   // If the user is authenticated, set isAuthenticated to true

//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         {isAuthenticated ? (
//           // If the user is authenticated, show the profile icon
//           <li>
//             <Link to="/profile">
//               <img src="profile-icon.png" alt="Profile" />
//             </Link>
//           </li>
//         ) : (
//           // If the user is not authenticated, show the register and login links
//           <>
//             <li>
//               <Link to="/signup">Sign Up</Link>
//             </li>
//             <li>
//               <Link to="/login">Login</Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
