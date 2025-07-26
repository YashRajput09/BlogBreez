import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
// import { AuthContext, AuthProvider } from './AuthProvider';

export const BlogAnalyticsContext = createContext();

export const BlogAnalyticsProvider = ({ children }) => {
  const [analytics, setAnalytics] = useState(null);
  // const [summaryAnalytics, setSummaryAnalytics] = useState(null);
  const [range, setRange] = useState("7d");
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/dashboard/analytics`,
          // {range},
          { withCredentials: true }
        );
        // console.log(res.data.data);
        console.log(res.data);
        setAnalytics(res.data);
        // setSummaryAnalytics(res.data.totalSummary)
      } catch (error) {
        console.log(error);
      }
    };
    fetchAnalyticsData();
  }, [range]);
  return (
    <BlogAnalyticsContext.Provider value={{ analytics }}>
      {children}
    </BlogAnalyticsContext.Provider>
  );
};

export const useBlogAnalytics = () => useContext(BlogAnalyticsContext);
