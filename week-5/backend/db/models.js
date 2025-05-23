const mongoose=require("mongoose");


const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
      },
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true
      }
})

const TodoSchema=new mongoose.Schema({
    title:String,
    description:String,
    due:String,
    category:String,
    priority:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
});

const UserModel=mongoose.model('User',UserSchema);
const TodoModel=mongoose.model('Todo',TodoSchema);

module.exports = {
    UserModel,
    TodoModel
};