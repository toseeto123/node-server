const { Schema, model, Types: {ObjectId} } =require ('mongoose');

const CommentSchema = new Schema ({
    content: { type: String, required: true },
    user: { type:ObjectId, required:true, ref: "user" },
    blog: { type:ObjectId, required:true, ref: "blog" },
},
 { timestamp: true }
);

const Comment = model ( 'comment', CommentSchema ); //comment에 s 붙을 예정 
 
module.exports = { Comment };