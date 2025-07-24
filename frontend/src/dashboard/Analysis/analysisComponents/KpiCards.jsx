import { TrendingDown, TrendingUp, FileText, Users, Eye, Heart } from 'lucide-react';

 const kpiData = [
    {
      title: "Total Articles",
      value: "1,247",
      change: "+18 this week",
      trend: "up",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Active Readers",
      value: "24,891",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "text-green-600",
    },
    {
      title: "Page Views",
      value: "187,423",
      change: "+8.7%",
      trend: "up",
      icon: Eye,
      color: "text-purple-600",
    },
    {
      title: "Engagement Rate",
      value: "6.4%",
      change: "-0.3%",
      trend: "down",
      icon: Heart,
      color: "text-red-600",
    },
  ];

const KpiCards = () => {
  return (
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
  )
}

export default KpiCards