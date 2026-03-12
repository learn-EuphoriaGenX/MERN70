let express = require('express')
const { authenticate } = require('../middleware/auth.middleware')
const upload = require('../config/multer.config')
const { createPost, getAllPosts, getPostById, updatePost, deletePost, votePost, addComment, deleteComment } = require('../controllers/post.controller')
let route = express.Router()

route.post('/create', upload.single('thumbnail'), createPost)
route.get('/all', getAllPosts)
route.get('/:postId', getPostById)
route.put('/:postId', authenticate(['user', 'admin']), upload.single('thumbnail'), updatePost)
route.delete('/:postId', authenticate(['user', 'admin']), deletePost)

// add/remove upvote/downvote to post
route.post('/:postId/:voteType', authenticate(['user', 'admin']), votePost)

// add comment to post
route.post('/:postId/comment', authenticate(['user', 'admin']), addComment)
// delete comment from post
route.delete('/:postId/comment/:commentId', authenticate(['user', 'admin']), deleteComment)

module.exports = route