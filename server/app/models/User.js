const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    first_name:{
        type: String,
        require: true
    },
    last_name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    followers:[
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    following:[
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);