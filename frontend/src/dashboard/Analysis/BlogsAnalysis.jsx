import React, { useState, useEffect } from "react";
import { Download, RefreshCw, PenTool } from "lucide-react";
import KpiCards from "./analysisComponents/KpiCards";
import ReadersAndPageViews from "./analysisComponents/ReadersAndPageViews"
import ContentByCategory from "./analysisComponents/ContentByCategory";
import ReaderEngagement from "./analysisComponents/ReaderEngagement";
import TopArticles from "./analysisComponents/TopArticles";
import RecentActivity from "./analysisComponents/RecentActivity";
const BlogsAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [isLoading, setIsLoading] = useState(false);

  function getDataRange(period) {
    const now = new Date();
    const pastDate = new Date();

    if (period === "7d") pastDate.setDate(now.getDate() - 6);
    if (period === "30d") pastDate.setDate(now.getDate() - 29);
    if (period === "90d") pastDate.setDate(now.getDate() - 89);
    if (period === "1y") pastDate.setFullYear(now.getFullYear() - 1);

    return { from: pastDate, to: now };
  }

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="md:ml-60 h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                  <PenTool className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  BreezBlogs Analytics
                </h1>
              </div>
              <p className="text-gray-600">
                Track your blog performance and reader engagement
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200"
              >
                <RefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors bg-white">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <KpiCards />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Readers & Views Chart */}
          <ReadersAndPageViews />

          {/* Content Categories */}
          <ContentByCategory />
        </div>

        {/* Engagement Chart */}
        <ReaderEngagement />

        {/* Top Articles */}
        <TopArticles />

        {/* Recent Activity */}
        <RecentActivity />
      </div>
    </div>
  );
};

export default BlogsAnalysis;