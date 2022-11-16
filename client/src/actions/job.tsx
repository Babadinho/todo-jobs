import axios from 'axios';

export const getJobs = async (userId: any, token: any) =>
  await axios.get(`${process.env.REACT_APP_URL}/jobs/${userId}`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

export const addJob = async (userId: any, jobDetails: any, token: any) =>
  await axios.post(
    `${process.env.REACT_APP_URL}/add-job/${userId}`,
    jobDetails,
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
