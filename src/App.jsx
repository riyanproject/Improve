import React, { useEffect, useState } from 'react';
import Home from './Components/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Player from './Components/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Playlist from './Components/Playlist/Playlist'; // Import the Playlist component

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        if (window.location.pathname === '/login') {
          navigate('/'); // Redirect to home if logged in
        }
      } else {
        setUser(null);
        if (window.location.pathname !== '/login') {
          navigate('/login'); // Redirect to login if not authenticated
        }
      }
    });

    return () => unsubscribe(); // Clean up the subscription on unmount
  }, [navigate]);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />

        <Route path='/playlist' element={<Playlist />} /> {/* Add Playlist Route */}
      </Routes>
    </div>
  );
};

export default App;
