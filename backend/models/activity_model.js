// models/activity.model.js
import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  actionType: {
    type: String, // 'post', 'like', 'comment', 'share', 'subscribe'
    required: true,
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'contentType', // dynamic reference to Blog, Comment, etc.
  },
  contentType: {
    type: String, // e.g. 'Blog', 'Comment'
  },
  message: String, // e.g. "Yash commented on 'X blog'"
  meta: {            //for comment
  type: Object,
  default: {}
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Activity = mongoose.model("Activity", activitySchema);
export default Activity
