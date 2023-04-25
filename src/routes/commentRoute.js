const { Router } = require("express");
const commentRouter = Router( { mergeParams:true }); //mergeParams:true를 해주면 :/blogId값도 commentRouter에 넣을수있음
const { Comment,Blog,User } = require('../models');
const { isValidObjectId } = require('mongoose');
/*
 /user
 /blog 는 독립적으로 호출 가능하지만
 /comment는 독립적으로 호출 불가니깐 하위개념  >> /blog/:blogId/comment
*/

commentRouter.post('/', async (req,res ) => {
    try{
        const { blogId } = req.params;
        const { content, userId } = req.body;
        if(!isValidObjectId(blogId))
            return res.status(400).send( { err: "blogId is invalid "});
        if(!isValidObjectId(userId))
            return res.status(400).send( { err: "userId is invalid "});
        if(typeof content !== 'string' ) return res.status(400).send( {err: "content is required"})

        const [blog, user] = await Promise.all([
            Blog.findById(blogId),
            User.findById(userId),
        ]);

        if(!blog || !user ) 
         return res.status(400).send( {err: "blog or user does not exist "});
        if(!blog.islive) 
         return res.status(400).send( {err: "blog or user does not exist "});
        
        const comment = new Comment ( {content,user,blog });
        await comment.save();
        return res.send ( { comment });
    }catch(err){
        return res.status(400).send( { err: err.message })
    }
})

commentRouter.get('/', async(req,res) => {
    const { blogId } = req.params;
    //처음에 validation에서 다 확인된경우는 굳이 다시한번더 blogId가 없는지 확인할필요없음
    if (!isValidObjectId(blogId))
     return res.status(400).send( { err: "blogId is invalid "});

    const comment = await Comment.find({ blog:blogId });
    return res.send( { comment });
})


module.exports = {
    commentRouter
}; 