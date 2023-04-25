const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: { type: String, required : true , unique: true}, //unique:true를 통해 중복 방지인데 이미 중복이 된 데이터가 있을경우 지워야지만 적용된다.
    name :{ 
        first : {type: String, required: true},
        last : {type: String, required: true}
    },
    age: Number,
    email:String
}, { timestamps: true })
//user라는 컬렉션을 만들것이고 user에 s를 붙여 users를 생성하게 될것임
const User = model('user',UserSchema);
module.exports = { User }