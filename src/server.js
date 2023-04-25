const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { User } = require('./models/User')


const MONGO_URI = 'mongodb+srv://taipoone:TlCH7HmnG4tKmWdm@devmeet.jqdhxcr.mongodb.net/test'

//async 를 쓰기 위해 함수로 감쌈 그래서 서버를 연결먼저하고 console.log() 내용을 찍어주게 된다.
const server = async() => {
  try{
    await mongoose.connect(MONGO_URI)
    mongoose.set('debug', true)
    console.log('MongoDB connected')
    app.use(express.json())

app.get('/user', async (req,res) => {
  try{
    const users = await User.find({}); //배열을 리턴
    return res.send({ users: users })
  }catch(err){
    console.log(err);
    return res.status(500).send({ err: err.message }) 
  }
})

app.get('/user/:userId', async(req,res) => {
  try{
    const { userId } =req.params;
    //validation 추가
    if(!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" }) 
    const user = await User.findOne( { _id: userId })
    return res.send( { user });
  }catch(err){
    console.log(err);
    return res.status(500).send({ err: err.message }) 
  }
})

app.post('/user',async (req,res) => {
  try{
    let { username, name } = req.body;
    if(!username) return res.status(400).send({ err: "username is required "});
    if(!name || !name.first || !name.last) return res.status(400).send({ err: "Both first and last names are required"});
    const user = new User( req.body );
    //await를 하는 이유는 상단에서 User document를 만든것이고 mongoose에서 save()함수로 Promise로 Document를 return하기때문에 await사용해야한다
   await user.save(); 
   return res.send({ user })
  }catch(err){
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})
app.delete('/user/:userId', async(req,res) => {
  try{
    const { userId } =req.params;
    //validation 추가
    if(!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" }) 
    const user = await User.findOneAndDelete( { _id:userId }); //user가 없을경우 null 존재할경우 찾아서 삭제
    return res.send( { user })
  }catch(err){
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

app.put('/user/:userId', async( req,res ) => {
  try{
    const { userId } =req.params;
    //validation 추가
    if(!mongoose.isValidObjectId(userId)) return res.status(400).send({ err: "invalid userId" }) 
    //age 변경
    const { age,name } = req.body;
    //숫자 validation 추가
    if(!age && !name) return res.status(400).send({ err: "age or name is required" })
    if(age && typeof age !== 'number') return res.status(400).send( { err: "age must be a number "});
    if(name && typeof name.first !== 'string' && typeof name.last !== 'string' ) return res.status(400).send({ err: "first and last name are strings"});
    
    //age,name 둘중에 하나를 입력해도 null이 아니라 입력된 값만 들어가도록 설정한 구간
    let updateBody = {};
    if(age) updateBody.age =age;
    if(name) updateBody.name= name;

    const user = await User.findByIdAndUpdate(userId,  { age,name } ,{new: true}) //{필터조건,필터옵션,new:true가 있어야 업데이트 후 문서를 리턴함}
    return res.send( { user })
  }catch(err){
    console.log(err);
    return res.status(500).send({ err: err.message })
  }
})

app.listen(3000, () =>  console.log('server listening on port 3000'))

  }catch(err){
console.log(err)
  }
}

server();