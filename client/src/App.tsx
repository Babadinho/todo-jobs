import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Jobs from './pages/Jobs';
import Login from './auth/Login';
import Register from './auth/Register';
import NavBar from './layouts/NavBar';
import Footer from './layouts/Footer';
import {
  UserContext,
  JobContext,
  CategoryContext,
  SitesContext,
  StatsContext,
} from './context/Context';
import { getJobs, getJobSites, getJobStats } from './middlewares/job';
import { isAuthenticated } from './middlewares/auth';
import PrivateRoute from './auth/PrivateRoute';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { getCategories } from './middlewares/category';

const App = () => {
  const [current, setCurrent] = useState(1);
  const [userDetails, setUserDetails] = useState<{} | null>(null);
  const [userJobs, setUserJobs] = useState<{} | null>(null);
  const [category, setCategory] = useState<Array<{}> | null>();
  const [jobSites, setJobSites] = useState<Array<{}> | null>();
  const [jobStats, setJobStats] = useState<Array<{}> | null>();
  let value: {};
  let jobs: {};
  let categories: {};
  let sites: {};
  let stats: {};
  value = useMemo(
    () => ({ userDetails, setUserDetails }),
    [userDetails, setUserDetails]
  );
  jobs = useMemo(() => ({ userJobs, setUserJobs }), [userJobs, setUserJobs]);
  categories = useMemo(
    () => ({ category, setCategory }),
    [category, setCategory]
  );
  sites = useMemo(() => ({ jobSites, setJobSites }), [jobSites, setJobSites]);
  stats = useMemo(() => ({ jobStats, setJobStats }), [jobStats, setJobStats]);

  /* Function for getting user jobs, stored in Context API. 
  Also passed down as props to Job component to use in getting jobs based on user filter
  This function accepts 3 arguments, userId, query: which is an object containing user filters, 
  and token. */
  const loadJobs = async (userId: string, query: {}, token: string) => {
    try {
      const res = isAuthenticated() && (await getJobs(userId, query, token));
      if (res.data) {
        setUserJobs(res.data);
        setCurrent(1);
      }
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  // this function loads list of user categories
  const loadCategories = async () => {
    try {
      const res =
        isAuthenticated() &&
        (await getCategories(
          isAuthenticated().user._id,
          isAuthenticated().token
        ));
      setCategory(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  // this function loads list of job sites
  const loadJobSites = async () => {
    try {
      const res =
        isAuthenticated() &&
        (await getJobSites(
          isAuthenticated().user._id,
          isAuthenticated().token
        ));
      setJobSites(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  // this function loads job application stats
  const loadJobStats = async () => {
    try {
      const res =
        isAuthenticated() &&
        (await getJobStats(
          isAuthenticated().user._id,
          isAuthenticated().token
        ));
      setJobStats(res.data);
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
    isAuthenticated() &&
      loadJobs(
        isAuthenticated().user._id,
        { createdAt: '-1' },
        isAuthenticated().token
      );
  }, [userDetails, setUserJobs]);

  useEffect(() => {
    loadCategories();
    loadJobStats();
    loadJobSites();
  }, [userJobs]);

  return (
    <>
      <Box>
        <UserContext.Provider value={value}>
          <JobContext.Provider value={jobs}>
            <CategoryContext.Provider value={categories}>
              <SitesContext.Provider value={sites}>
                <StatsContext.Provider value={stats}>
                  <NavBar />
                  <Routes>
                    <Route
                      path='/'
                      element={
                        userDetails ? <Navigate to='/jobs' /> : <Index />
                      }
                    />
                    <Route
                      path='/jobs'
                      element={
                        <PrivateRoute>
                          <Jobs
                            loadJobs={loadJobs}
                            current={current}
                            setCurrent={setCurrent}
                          />
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
                </StatsContext.Provider>
              </SitesContext.Provider>
            </CategoryContext.Provider>
          </JobContext.Provider>
        </UserContext.Provider>
      </Box>
      <Footer />
    </>
  );
};

export default App;
