const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    img: {
        type: String
    },
}, {timestamps: true});

userSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model('User', userSchema);