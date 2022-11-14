import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import Jobs from './components/Jobs';
import Login from './auth/Login';
import Register from './auth/Register';
import NavBar from './components/NavBar';

const App = () => {
  const [userDetails, setUserDetails] = useState<string | null>(null);
  let value: any;
  value = useMemo(
    () => ({ userDetails, setUserDetails }),
    [userDetails, setUserDetails]
  );

  useEffect(() => {
    if (localStorage.getItem('track-jobs')) {
      setUserDetails(localStorage.getItem('track-jobs'));
    }
  }, [userDetails]);
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Jobs />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  );
};

export default App;
