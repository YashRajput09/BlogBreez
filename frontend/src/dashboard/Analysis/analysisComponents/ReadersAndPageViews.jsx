import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

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
  
const ReadersAndPageViews = () => {
  return (
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
  )
}

export default ReadersAndPageViews