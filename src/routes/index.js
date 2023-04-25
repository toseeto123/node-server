
//각 파일 exports를 불러와서 합친후 하나의 객체로 exports 한다.
module.exports = {
    ...require('./blogRoute'),
    ...require('./commentRoute'),
    ...require('./userRoute')
};