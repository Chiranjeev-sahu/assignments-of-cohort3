const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('your-mongodb-url');

// Define schemas

const UserSchema =new mongoose.Schema({
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters']
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address']
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [8, 'Password must be at least 8 characters']
    },
  }, { timestamps: true });

const TodoSchema = new mongoose.Schema({
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true,
      maxlength: [200, 'Todo content cannot exceed 200 characters']
    },
    complete: {
      type: Boolean,
      default: false
    },
    priority: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true // Ensure every todo has a creator
    }
  }, { timestamps: true });
  
  export const Todo = mongoose.model('Todo', todoSchema);

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}