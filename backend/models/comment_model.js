import mongoose from 'mongoose';

const commentSchema  = new mongoose.Schema({

        blogId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Blog',
                required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
            required: true,
            maxlength: 500,
        },
        perentCommentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment', //for nested replies
            default: null
        }
    
},
{ timestamps: true }
)
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;