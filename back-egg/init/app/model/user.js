// egg-mongoose使用
// https://www.cnblogs.com/wxw1314/p/10339775.html
module.exports =  app =>{
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        psw: {
            type: String,
            required: true,
            select: false,
        }
    })
   return mongoose.model('User', UserSchema);
}