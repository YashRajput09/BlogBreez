import { Heart, MessageCircle, Share2 } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

  const engagementData = [
    { name: 'Mon', comments: 45, shares: 23, likes: 156 },
    { name: 'Tue', comments: 52, shares: 31, likes: 189 },
    { name: 'Wed', comments: 38, shares: 19, likes: 134 },
    { name: 'Thu', comments: 67, shares: 42, likes: 234 },
    { name: 'Fri', comments: 73, shares: 48, likes: 267 },
    { name: 'Sat', comments: 91, shares: 61, likes: 312 },
    { name: 'Sun', comments: 84, shares: 55, likes: 289 }
  ];
  
const ReaderEngagement = () => {
  return (
       <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="md:flex items-center justify-between mb-6">
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
  )
}

export default ReaderEngagement