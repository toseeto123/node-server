const { Router } = require('express');
const blogRouter = Router();
const { Blog } = require('../models/Blog');
const { User } = require('../models/User');
const { isValidObjectId } = require('mongoose') //mongoose가 검증

blogRouter.post("/", async(req,res) => {
    try{
        const { title, content, islive, userId } =req.body;
        if (typeof title !== 'string' ) 
         res.status(400).send({err: "title is required"});
        if (typeof content !== 'string' ) 
         res.status(400).send({err: "content is required"}); 
        if (islive && islive !== 'boolean' ) //islive가 존재하고 불리언인지 확인
         res.status(400).send({err: "islive must be boolean"});
        if(!isValidObjectId(userId)) 
         res.status(400).send({ err: "userId is invalid"});
       
        //userId형식은 맞지만 db에 존재하지않는경우
        let user = await User.findById(userId);
        if(!user) 
         res.status(400).send( { err: "user does not exist"});

        let blog = new Blog({ ...req.body, user }); //user:userId까지 안해도 model에서 _id조회해올것임
        await blog.save();
        return res.send( { blog } )
    }catch(err){
        console.log(err);
         res.status(500).send( { err: err.message })
    }
});
blogRouter.get('/', async(req,res) => {
    try{
        const blogs = await Blog.find({});
        return res.send( { blogs })
    }catch(err){
        console.log(err);   
        res.status(500).send( {err: err.message }); 
    }
});

blogRouter.get("/:blogId", async(req,res) => {
    try{
        const { blogId } = req.params; //blogId 불러오기
        if(!isValidObjectId( blogId )) 
        res.status(400).send({ err: "userId is invalid"});

        const blog = await Blog.findOne({ _id: blogId });
        return res.send( { blog })
    }catch(err){
        console.log(err);
        res.status(500).send( {err: err.message });
    }
});

blogRouter.put('/:blogId', async(req,res) => {
    try{
        const { blogId } = req.params; //blogId 불러오기
        if(!isValidObjectId( blogId )) 
        res.status(400).send({ err: "userId is invalid"});

        const {title, content }= req.body;
        if (typeof title !== 'string' ) 
         res.status(400).send({err: "title is required"});
        if (typeof content !== 'string' ) 
         res.status(400).send({err: "content is required"}); 

         const blog = await Blog.findOneAndUpdate( { _id: blogId }, { title, content }, { new: true })
         return res.send( { blog })
    }catch(err){
        console.log(err);
        res.status(500).send( {err: err.message });
    }
});
//put은 전체수정, patch는 특정부분만 수정할때 사용
blogRouter.patch('/:blogId/live', async(req,res) => {
    try{
        const { blogId } = req.params; //blogId 불러오기
        if(!isValidObjectId( blogId )) 
        res.status(400).send({ err: "userId is invalid"});

        const { islive } = req.body;
        if(typeof islive !== 'boolean' ) res.status(400).send( { err: "boolean islive is required"});

        const blog = await Blog.findByIdAndUpdate(blogId, { islive }, { new:true });
        return res.send({blog});
    }catch(err){
        console.log(err);
        res.status(500).send( {err: err.message });
    }
});
module.exports = { blogRouter };