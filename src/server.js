const express = require('express');
const app = express();
const { userRouter } = require ('./routes/userRoute')
const { blogRouter } = require ('./routes/blogRoute')
const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://taipoone:TlCH7HmnG4tKmWdm@devmeet.jqdhxcr.mongodb.net/test'

//async 를 쓰기 위해 함수로 감쌈 그래서 서버를 연결먼저하고 console.log() 내용을 찍어주게 된다.
const server = async() => {
  try{
    await mongoose.connect(MONGO_URI)
    mongoose.set('debug', true)
    console.log('MongoDB connected')

    app.use(express.json())

    //user로 시작하는것은 useRouter사용
    app.use('/user', userRouter)
    //blog로 시작하는것은 blogRouter사용
    app.use("/blog", blogRouter)
    //comment로 시작하는것은 commentRouter 사용
    //commentRoute의 mergeParams:true 설정으로 /:blogId값도 반영할수있음
    // 해당 내용은 blogRoute로 보냄
    // app.use("/blog/:blogId/comment", commentRouter)

    app.listen(3000, () =>  console.log('server listening on port 3000'))
  }catch(err){
      console.log(err)
  }
}

server();