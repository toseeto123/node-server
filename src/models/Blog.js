const { Schema, model, Types } = require ('mongoose');

const BlogSchema = new Schema (
    {
    title: { type: String, required: true },
    content: { type: String, required: true },
    islive: { type: Boolean, required: true, default: false }, //islive가 true면 고객에게 노출, islive가 false면 임시저장
    user: { type: Types.ObjectId, required: true, ref: "user" } //User에 있는 collection 'user'를 나타낸다.
},
    { timestamps: true }
);

const Blog = model("blog",BlogSchema);
module.exports = { Blog };