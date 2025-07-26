import axios from 'axios';
import {useState, useEffect} from 'react';  
  
const TopArticles = () => {

const [topBlogs, setTopBlogs] = useState([]);

useEffect(() => {
const fetchTopBlogs = async()=>{
  try {
    const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/user/dashboard/analytics/topperformingblogs`,
    {
       withCredentials: true
    })
    
    setTopBlogs(res.data.blogsWithCommentCount)
  } catch (error) {
     console.error("Error fetching top articles:", error);
  }
};
fetchTopBlogs();
},[])

const getCategoryBadgeStyle = (category) => {
  switch (category?.toLowerCase()) {
    case 'technology': return 'bg-blue-100 text-blue-700';
    case 'tech': return 'bg-blue-100 text-blue-700';
    case 'lifestyle': return 'bg-purple-100 text-purple-700';
    case 'devotional': return 'bg-yellow-100 text-yellow-400';
    case 'travel': return 'bg-green-100 text-green-700';
    case 'sports': return 'bg-green-100 text-green-700';
    case 'food & recipe': return 'bg-yellow-100 text-yellow-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};


  return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Performing Articles</h3>
            {/* <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All Articles</button> */}
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
                {topBlogs.map((article, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-2">
                      <div className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer">
                        {article.title}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryBadgeStyle(article.category?.[0])}`}>
                         {article.category?.[0] || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right font-medium text-gray-900">
                      {article.views.toLocaleString()}
                    </td>
                    <td className="py-4 px-2 text-right text-gray-600">
                       {article.commentCount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
  )
}

export default TopArticles