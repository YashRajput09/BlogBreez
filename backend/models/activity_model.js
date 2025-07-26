import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  title: String,
  time: {
    type: Date,
    default: Date.now,
  },
  type: {
    type: String,
    enum: ['publish', 'comment', 'share', 'subscriber', 'like'],
    required: true,
  },
});

const Activity = mongoose.model('Activity', activitySchema);

export default Activity;
