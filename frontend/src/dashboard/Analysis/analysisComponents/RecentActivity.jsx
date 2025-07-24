import { FileText, Heart, MessageCircle, Share2, Users } from "lucide-react"

const RecentActivity = () => {
  return (
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
  )
}

export default RecentActivity