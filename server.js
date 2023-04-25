const express = require('express');
const app = express();
const mongoose = require('mongoose');

const users = [];

const MONGO_URI = 'mongodb+srv://taipoone:TlCH7HmnG4tKmWdm@devmeet.jqdhxcr.mongodb.net/test'

//async 를 쓰기 위해 함수로 감쌈 그래서 서버를 연결먼저하고 console.log() 내용을 찍어주게 된다.
const server = async() => {
  try{
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected')
    app.use(express.json())

app.get('/user', function(req,res){
  res.send({ users: users })
})

app.post('/user',function (req,res){
   
    users.push({ name:req.body.name ,age:req.body.age })
    return res.send({ success: true })
})
app.listen(3000,function(){
    console.log('server listening on port 3000');
})

  }catch(err){
console.log(err)
  }
}

server();