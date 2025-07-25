import {useState, useEffect} from 'react';  
  
  const topArticles = [
    { title: '10 JavaScript Tips Every Developer Should Know', views: 15420, comments: 89, category: 'Technology' },
    { title: 'Ultimate Guide to Minimalist Living', views: 12340, comments: 67, category: 'Lifestyle' },
    { title: 'Hidden Gems of Southeast Asia', views: 11200, comments: 45, category: 'Travel' },
    { title: 'Healthy Breakfast Recipes for Busy Mornings', views: 9850, comments: 34, category: 'Food & Recipe' },
    { title: 'Building Your First React App', views: 8760, comments: 52, category: 'Technology' }
  ];

const TopArticles = () => {
  return (
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
  )
}

export default TopArticles