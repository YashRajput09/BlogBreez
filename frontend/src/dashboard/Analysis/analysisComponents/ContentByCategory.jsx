import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

  const categoryData = [
    { name: 'Technology', value: 32, color: '#3b82f6' },
    { name: 'Lifestyle', value: 24, color: '#8b5cf6' },
    { name: 'Travel', value: 18, color: '#10b981' },
    { name: 'Food & Recipe', value: 15, color: '#f59e0b' },
    { name: 'Health & Fitness', value: 11, color: '#ef4444' }
  ];
  
const ContentByCategory = () => {
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
  )
}

export default ContentByCategory