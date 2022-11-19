import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './auth/PrivateRoute';
import Jobs from './pages/Jobs';
import Login from './auth/Login';
import Register from './auth/Register';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import { UserContext, JobContext } from './context/Context';
import { getJobs } from './middlewares/job';
import { isAuthenticated } from './middlewares/auth';
import { Box } from '@chakra-ui/react';

const App = () => {
  const [userDetails, setUserDetails] = useState<{} | null>(null);
  const [userJobs, setUserJobs] = useState<{} | null>(null);
  let value: {};
  let jobs: any;
  value = useMemo(
    () => ({ userDetails, setUserDetails }),
    [userDetails, setUserDetails]
  );
  jobs = useMemo(() => ({ userJobs, setUserJobs }), [userJobs, setUserJobs]);

  const loadJobs = async (userId: any, query: any, token: any) => {
    try {
      const res = isAuthenticated() && (await getJobs(userId, query, token));
      setUserJobs(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('todo-jobs')) {
      setUserDetails(JSON.parse(localStorage.getItem('todo-jobs')));
    }
  }, []);

  useEffect(() => {
    loadJobs(isAuthenticated().user._id, {}, isAuthenticated().token);
  }, [userDetails]);
  return (
    <Box _light={{ bg: '#f7f8fd' }}>
      <UserContext.Provider value={value}>
        <JobContext.Provider value={jobs}>
          <NavBar />
          <Routes>
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Jobs loadJobs={loadJobs} />
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
          <Footer />
        </JobContext.Provider>
      </UserContext.Provider>
    </Box>
  );
};

export default App;
