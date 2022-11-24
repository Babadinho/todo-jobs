import { createContext } from 'react';

interface userInterface {
  userDetails: any;
  setUserDetails: any;
}
export const UserContext = createContext<Partial<userInterface>>({});

interface jobInterface {
  userJobs: any;
  setUserJobs: any;
}
export const JobContext = createContext<Partial<jobInterface>>({});

interface categoryInterface {
  category: any;
  setCategory: any;
}
export const CategoryContext = createContext<Partial<categoryInterface>>({});

interface SitesInterface {
  jobSites: any;
  setJobSites: any;
}
export const SitesContext = createContext<Partial<SitesInterface>>({});

interface StatsInterface {
  jobStats: any;
  setJobStats: any;
}
export const StatsContext = createContext<Partial<StatsInterface>>({});
