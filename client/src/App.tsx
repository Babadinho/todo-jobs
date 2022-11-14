import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import Jobs from './components/Jobs';
import Login from './auth/Login';
import Register from './auth/Register';
import NavBar from './components/NavBar';
import { UserContext } from './context/Context';

const App = () => {
  const [userDetails, setUserDetails] = useState<{} | null>(null);
  let value: {};
  value = useMemo(
    () => ({ userDetails, setUserDetails }),
    [userDetails, setUserDetails]
  );

  useEffect(() => {
    if (localStorage.getItem('track-jobs')) {
      setUserDetails(JSON.parse(localStorage.getItem('track-jobs')));
    }
  }, [userDetails]);
  return (
    <>
      <UserContext.Provider value={value}>
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
          <Route
            path='/login'
            element={userDetails ? <Navigate to='/' /> : <Login />}
          />
          <Route
            path='/register'
            element={userDetails ? <Navigate to='/' /> : <Register />}
          />
        </Routes>
      </UserContext.Provider>
    </>
  );
};

export default App;
