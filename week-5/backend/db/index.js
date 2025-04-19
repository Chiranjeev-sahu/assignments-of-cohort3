const mongoose=require('mongoose');

mongoose.connect('url_to_be_inserted');

const UserSchema=new mongoose.Schema({

})

const TodoSchema=new mongoose.Schema({

});

const User=mongoose.model('User',UserSchema);
const Todo=mongoose.model('Todo',TodoSchema);

module.exports={
    User,
    Todo
}