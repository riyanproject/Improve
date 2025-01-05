import React, { useEffect, useState } from 'react';
import Home from './Components/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Player from './Components/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Playlist from './Components/Playlist/Playlist';
import Player1 from './Components/Player1/Player1';
import Inventory from './Components/Inventory/Inventory';  // Import the Inventory component

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
        <Route path='/player1/:id' element={<Player1 />} />
        <Route path='/playlist' element={<Playlist />} />
        <Route path='/inventory' element={<Inventory />} />  {/* Add the Inventory route */}
      </Routes>
    </div>
  );
};

export default App;
