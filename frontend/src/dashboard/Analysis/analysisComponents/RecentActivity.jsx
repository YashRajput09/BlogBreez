import { useState, useEffect } from "react";
import { FileText, Heart, MessageCircle, Share2, Users } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const RecentActivity = () => {
  const [recentActivity, setRecentActivity] = useState(null);

  useEffect(() => {
    const fetchRecentActivities = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_APP_BACKEND_URL
          }/user/dashboard/analytics/recent-activities`,
          {
            withCredentials: true,
          }
        );
        // console.log("Recent Activity: ", res.data.activities);

        setRecentActivity(res.data.activities);
      } catch (error) {
        console.log("Failed to fetch activities:", error);
      }
    };
    fetchRecentActivities();
  }, []);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        {/* <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button> */}
      </div>
      <div className="space-y-4">
        {recentActivity && recentActivity?.length > 0 ? (
          recentActivity.slice(0,5).map((activity, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div
                className={`p-2 rounded-full ${
                  activity.actionType === "publish"
                    ? "bg-blue-100 text-blue-600"
                    : activity.actionType === "comment"
                    ? "bg-green-100 text-green-600"
                    : activity.actionType === "share"
                    ? "bg-purple-100 text-purple-600"
                    : activity.actionType === "subscriber"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {activity.actionType === "publish" ? (
                  <FileText className="w-4 h-4" />
                ) : activity.actionType === "comment" ? (
                  <MessageCircle className="w-4 h-4" />
                ) : activity.actionType === "share" ? (
                  <Share2 className="w-4 h-4" />
                ) : activity.actionType === "subscriber" ? (
                  <Users className="w-4 h-4" />
                ) : (
                  <Heart className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity?.message}</p>
                <p className="text-gray-600 text-sm">
                  {activity.meta ? `${(activity.meta.commentText).slice(0, 30)}...` : activity?.contentId?.title}
                </p>
              </div>
            <span className="text-gray-500 text-sm">
                {dayjs(activity?.createdAt).fromNow()}
              </span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No recent activity</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;
