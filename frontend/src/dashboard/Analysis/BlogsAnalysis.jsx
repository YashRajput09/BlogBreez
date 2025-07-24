import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Users, Eye, FileText, MessageCircle, Heart, Share2, Calendar, Filter, Download, RefreshCw, PenTool } from 'lucide-react';

const BlogsAnalysis = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isLoading, setIsLoading] = useState(false);

  function getDataRange(period){
    const now = new Date();
    const pastDate = new Date();

    if(period === "7d") pastDate.setDate(now.getDate() - 6);
    if(period === "30d") pastDate.setDate(now.getDate() - 29);
    if(period === "90d") pastDate.setDate(now.getDate() - 89);
    if(period === "1y") pastDate.setFullYear(now.getFullYear() - 1);

    return {from: pastDate, to: now}
  }
  
  // Blog-specific sample data
  const readersData = [
    { name: 'Jan', readers: 12400, views: 18600 },
    { name: 'Feb', readers: 11200, views: 16800 },
    { name: 'Mar', readers: 15600, views: 23400 },
    { name: 'Apr', readers: 14800, views: 22200 },
    { name: 'May', readers: 18200, views: 27300 },
    { name: 'Jun', readers: 21500, views: 32250 },
    { name: 'Jul', readers: 24800, views: 37200 }
  ];

  const categoryData = [
    { name: 'Technology', value: 32, color: '#3b82f6' },
    { name: 'Lifestyle', value: 24, color: '#8b5cf6' },
    { name: 'Travel', value: 18, color: '#10b981' },
    { name: 'Food & Recipe', value: 15, color: '#f59e0b' },
    { name: 'Health & Fitness', value: 11, color: '#ef4444' }
  ];

  const engagementData = [
    { name: 'Mon', comments: 45, shares: 23, likes: 156 },
    { name: 'Tue', comments: 52, shares: 31, likes: 189 },
    { name: 'Wed', comments: 38, shares: 19, likes: 134 },
    { name: 'Thu', comments: 67, shares: 42, likes: 234 },
    { name: 'Fri', comments: 73, shares: 48, likes: 267 },
    { name: 'Sat', comments: 91, shares: 61, likes: 312 },
    { name: 'Sun', comments: 84, shares: 55, likes: 289 }
  ];

  const kpiData = [
    { 
      title: 'Total Articles', 
      value: '1,247', 
      change: '+18 this week', 
      trend: 'up', 
      icon: FileText,
      color: 'text-blue-600'
    },
    { 
      title: 'Active Readers', 
      value: '24,891', 
      change: '+12.3%', 
      trend: 'up', 
      icon: Users,
      color: 'text-green-600'
    },
    { 
      title: 'Page Views', 
      value: '187,423', 
      change: '+8.7%', 
      trend: 'up', 
      icon: Eye,
      color: 'text-purple-600'
    },
    { 
      title: 'Engagement Rate', 
      value: '6.4%', 
      change: '-0.3%', 
      trend: 'down', 
      icon: Heart,
      color: 'text-red-600'
    }
  ];

  const topArticles = [
    { title: '10 JavaScript Tips Every Developer Should Know', views: 15420, comments: 89, category: 'Technology' },
    { title: 'Ultimate Guide to Minimalist Living', views: 12340, comments: 67, category: 'Lifestyle' },
    { title: 'Hidden Gems of Southeast Asia', views: 11200, comments: 45, category: 'Travel' },
    { title: 'Healthy Breakfast Recipes for Busy Mornings', views: 9850, comments: 34, category: 'Food & Recipe' },
    { title: 'Building Your First React App', views: 8760, comments: 52, category: 'Technology' }
  ];

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
              <p className="text-gray-600">Track your blog performance and reader engagement</p>
            </div>
            <div className="flex items-center gap-3">
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
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${
                    kpi.color.includes('blue') ? 'from-blue-100 to-blue-200' :
                    kpi.color.includes('green') ? 'from-green-100 to-green-200' :
                    kpi.color.includes('purple') ? 'from-purple-100 to-purple-200' :
                    'from-red-100 to-red-200'
                  }`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {kpi.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {kpi.change}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                  <p className="text-gray-600 text-sm">{kpi.title}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Readers & Views Chart */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Readers & Page Views</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  Readers
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  Views
                </div>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={readersData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Area type="monotone" dataKey="readers" stroke="#3b82f6" fill="#dbeafe" />
                <Area type="monotone" dataKey="views" stroke="#8b5cf6" fill="#ede9fe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Content Categories */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Content by Category</h3>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-700">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engagement Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Reader Engagement</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-blue-500" />
                Comments
              </div>
              <div className="flex items-center gap-2">
                <Share2 className="w-4 h-4 text-green-500" />
                Shares
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                Likes
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="likes" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="shares" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="comments" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Top Articles */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Articles</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All Articles</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Article Title</th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-600">Category</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Views</th>
                  <th className="text-right py-3 px-2 text-sm font-medium text-gray-600">Comments</th>
                </tr>
              </thead>
              <tbody>
                {topArticles.map((article, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2">
                      <div className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        {article.title}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.category === 'Technology' ? 'bg-blue-100 text-blue-700' :
                        article.category === 'Lifestyle' ? 'bg-purple-100 text-purple-700' :
                        article.category === 'Travel' ? 'bg-green-100 text-green-700' :
                        article.category === 'Food & Recipe' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {article.category}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right font-medium text-gray-900">
                      {article.views.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-right text-gray-600">
                      {article.comments}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { action: 'New article published', title: '"React Performance Tips"', time: '2 minutes ago', type: 'publish' },
              { action: 'Comment on article', title: '"JavaScript Best Practices"', time: '15 minutes ago', type: 'comment' },
              { action: 'Article shared', title: '"Travel Photography Guide"', time: '1 hour ago', type: 'share' },
              { action: 'New subscriber', title: 'Sarah Johnson joined', time: '3 hours ago', type: 'subscriber' },
              { action: 'Article liked', title: '"Healthy Recipe Collection"', time: '5 hours ago', type: 'like' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'publish' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'comment' ? 'bg-green-100 text-green-600' :
                  activity.type === 'share' ? 'bg-purple-100 text-purple-600' :
                  activity.type === 'subscriber' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {activity.type === 'publish' ? <FileText className="w-4 h-4" /> :
                   activity.type === 'comment' ? <MessageCircle className="w-4 h-4" /> :
                   activity.type === 'share' ? <Share2 className="w-4 h-4" /> :
                   activity.type === 'subscriber' ? <Users className="w-4 h-4" /> :
                   <Heart className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-600 text-sm">{activity.title}</p>
                </div>
                <span className="text-gray-500 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsAnalysis;