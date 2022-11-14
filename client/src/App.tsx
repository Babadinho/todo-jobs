import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import Jobs from './components/Jobs';
import Login from './auth/Login';
import Register from './auth/Register';

const App = () => {
  return (
    <>
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
