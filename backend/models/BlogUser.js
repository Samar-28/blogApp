const mongoose = require('mongoose')
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        min: 3,
        max:20,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isAvatarSet:{
        type: Boolean,
        default : false,
    },
    Avatar:{
        type: String,
        default: ""
    }
});

module.exports = mongoose.model('blogUsers', UserSchema);