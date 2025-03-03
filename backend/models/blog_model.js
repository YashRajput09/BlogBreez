import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true 
    },
    title: {
        type: String,
        required: true
    },
    blogImage: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true,
        minlength: [200, "Atleast 200 characters required."]
    },
    adminImage: {
        type: String,
        required: true
    },
    adminName: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
    likes:{
        type: Number,
        default: 0
    },
    likedBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        }],
    category: [{
        type: String,
        required: true,
    }],
    tags: [{
        type: [String],
        required: true,
}],
    views: {
        type: Number,
        default: 0, // Track views
    },
    viewers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],// Track users who viewed the blog   
})

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;