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
        // required: true
    },
    adminName: {
        type: String,
        // required: true
    },
    craetedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;