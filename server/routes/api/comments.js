import express from 'express';

var router = express.Router();

router.post('/', async function(req, res, next) {
    if (req.session.isAuthenticated) {
        try {
            const newComment = new req.models.Comment({
                username: req.body.username,
                comment: req.body.comment,
                post: req.body.postID,
                date_created: Date.now()
            })
            await newComment.save()
            res.json({"status": "success"});
        } catch (error) {
            console.log(error)
            res.status(500).json({"status": "error", "error": error})
        }
    } else {
        res.status(401).json({
            status: "error",
            error: "not logged in"
        })
    }
});

router.get('/', async function(req, res, next) {
    let allComments = await req.models.Comment.find({post: req.query.postID})
    try {
        let comments = await Promise.all(allComments.map(async comment => {
            return {
                "username": comment.username,
                "comment": comment.comment,
                "date_created": comment.date_created,
                "post": comment.post
            }
        }))
        res.json(comments); 
    } catch (error) {
        console.log(error);
        res.status(500).json({"status": "error", "error": error})
    }
});

export default router;