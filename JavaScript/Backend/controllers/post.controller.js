const Post = require('../models/posts.model')
const User = require('../models/user.model')
const { verifyToken } = require('../utils/jwt.utils')

// create new post
module.exports.createPost = async (req, res) => {
    try {
        let { userType, title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        if (userType === 'user') {

            let token = req.headers.authorization
            if (!token) {
                return res.status(401).json({ success: false, message: "Unauthorized" })
            }
            let decoded = verifyToken(token)

            let userId = decoded.userId
            let user = await User.findById(userId)
            if (user.currentPostCount >= user.postUploadLimit) {
                return res.status(403).json({ success: false, message: "Post upload limit reached. Please upgrade your subscription." })
            }
            let newPost = await Post.create({
                userType,
                userId,
                title,
                content,
                thumbmail: req.file ? req.file.path : null,
                tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
                category: req.body.category ? req.body.category : 'other'
            })
            user.currentPostCount += 1
            await user.save()
            res.status(201).json({ success: true, message: "Post created successfully", data: newPost })
        } else {
            let newPost = await Post.create({
                userType,
                title,
                content,
                thumbmail: req.file ? req.file.path : null,
                tags: req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : [],
                category: req.body.category ? req.body.category : 'other'
            })
            res.status(201).json({ success: true, message: "Post created successfully", data: newPost })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// get all posts
module.exports.getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find().populate('userId', 'username')
        res.status(200).json({ success: true, data: posts })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// get post by id
module.exports.getPostById = async (req, res) => {
    try {
        let postId = req.params.postId;
        let post = await Post.findById(postId).populate('userId', 'username')
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        res.status(200).json({ success: true, data: post })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// update post
module.exports.updatePost = async (req, res) => {
    try {
        let postId = req.params.postId;
        let post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }

        post.title = req.body.title || post.title
        post.content = req.body.content || post.content
        post.tags = req.body.tags ? req.body.tags.split(',').map(tag => tag.trim()) : post.tags
        post.category = req.body.category || post.category
        if (req.file) {
            post.thumbnail = req.file.path
        }
        await post.save()
        res.status(200).json({ success: true, message: "Post updated successfully", data: post })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// delete post
module.exports.deletePost = async (req, res) => {
    try {
        let postId = req.params.postId;
        let post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        await Post.findByIdAndDelete(postId)
        res.status(200).json({ success: true, message: "Post deleted successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


// add upvote/downvote to post
module.exports.votePost = async (req, res) => {
    try {
        let postId = req.params.postId;
        let voteType = req.params.voteType; // 'up' or 'down'
        let userId = req.user.userId;
        let post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        if (voteType === 'up') {
            if (post.votes.up.includes(userId)) {
                return res.status(400).json({ success: false, message: "You have already upvoted this post" })
            }
            post.votes.up.push(userId)
            // Remove downvote if exists
            post.votes.down = post.votes.down.filter(id => id.toString() !== userId)
        }
        else if (voteType === 'down') {
            if (post.votes.down.includes(userId)) {
                return res.status(400).json({ success: false, message: "You have already downvoted this post" })
            }
            post.votes.down.push(userId)
            // Remove upvote if exists
            post.votes.up = post.votes.up.filter(id => id.toString() !== userId)
        }
        else {
            return res.status(400).json({ success: false, message: "Invalid vote type" })
        }
        await post.save()
        res.status(200).json({ success: true, message: "Vote recorded successfully", data: post })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}


// add comment to post
module.exports.addComment = async (req, res) => {
    try {
        let postId = req.params.postId;
        let userId = req.user.userId;
        let { comment } = req.body
        if (!comment) {
            return res.status(400).json({ success: false, message: "Comment cannot be empty" })
        }
        let post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        post.comments.push({ userId, comment })
        await post.save()
        res.status(200).json({ success: true, message: "Comment added successfully", data: post })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}

// delete comment from post
module.exports.deleteComment = async (req, res) => {
    try {
        let postId = req.params.postId;
        let commentId = req.params.commentId;
        let post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" })
        }
        let comment = post.comments.id(commentId)
        if (!comment) {
            return res.status(404).json({ success: false, message: "Comment not found" })
        }
        await comment.remove()
        await post.save()
        res.status(200).json({ success: true, message: "Comment deleted successfully", data: post })
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}




