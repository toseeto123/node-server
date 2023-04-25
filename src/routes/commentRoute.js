const { Router } = require("express");
const commentRouter = Router( { mergeParams:true }); //mergeParams:true를 해주면 :/blogId값도 commentRouter에 넣을수있음
const { Comment } = require('../models/Comment');
const { isValidObjectId } = require('mongoose');
const { Blog } = require ('../models/Blog');
const { User } = require ('../models/User');
/*
 /user
 /blog 는 독립적으로 호출 가능하지만
 /comment는 독립적으로 호출 불가니깐 하위개념  >> /blog/:blogId/comment
*/

commentRouter.post('/', async (req,res ) => {
    try{
        const { blogId } = req.params;
        const {content, userId } = req.body;
        if(!isValidObjectId(blogId))
            return res.status(400).send( { err: "blogId is invalid "});
        if(!isValidObjectId(userId))
            return res.status(400).send( { err: "userId is invalid "});
        if(typeof content !== 'string' ) return res.status(400).send( {err: "content is required"})

        const blog = await Blog.findById(blogId);
        const user = await User.findById(userId);

        if(!blog || !user ) 
         return res.status(400).send( {err: "blog or user does not exist "});
        if(!blog.islive) 
         return res.status(400).send( {err: "blog or user does not exist "});
        
        const comment = new Comment ( {content,user,blog });
        return res.send ( { comment });
    }catch(err){
        return res.status(400).send( { err: err.message })
    }
})

commentRouter.get('/')


module.exports = {
    commentRouter
}; 