import React, { useEffect } from 'react';
import Home from './Components/Home/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Components/Login/Login';
import Player from './Components/Player/Player';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && (window.location.pathname === '/login')) {
        navigate('/'); // Redirect only from login to home
      } else if (!user && (window.location.pathname !== '/login')) {
        navigate('/login'); // Redirect only if not on the login page
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/player/:id' element={<Player />} />
      </Routes>
    </div>
  );
}

export default App;
