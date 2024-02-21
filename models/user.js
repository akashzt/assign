const mongoose=require('mongoose');
const userSchema =mongoose.Schema({
    email: {
        type: String,
        unique:true,
    },
    password:{
        type :String 
    },
    role:{
        type:String,
        default:"employee"
    },
      createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User',userSchema);