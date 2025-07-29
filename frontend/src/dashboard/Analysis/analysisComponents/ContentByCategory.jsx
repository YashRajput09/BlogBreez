import axios from 'axios';
import { useEffect, useState } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

// Optional: Define some fixed colors to use
const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#ff69b4", "#00C49F", "#FFBB28"];

const ContentByCategory = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const categoryStatsData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_BACKEND_URL}/user/dashboard/analytics/category-stats`,
          {
            withCredentials: true,
          }
        );
        const apiData = res.data.categoryCount;

        const total = apiData.reduce((sum, item) => sum + item.count, 0);

        // Convert API data to format: { name, value, color }
        const formatted = apiData.map((item, index) => ({
          name: item.category,
          value: parseFloat(((item.count / total) * 100).toFixed(2)), // convert count to percentage
          count: item.count,
          color: COLORS[index % COLORS.length],
        }));

        setCategoryData(formatted);
      } catch (error) {
        console.log("Failed to fetch category stats:", error);
      }
    };
    categoryStatsData();
  }, []);

  return (
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
      <div className="mt-4 grid grid-cols-2 gap-2">
        {categoryData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-700 capitalize">{item.name}</span>
            </div>
            <span className="font-medium text-gray-900">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentByCategory;
