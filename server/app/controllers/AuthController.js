const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    const { username, first_name, last_name, email, password, confirmed_password } = req.body;

    try {
        const emailExists = await User.findOne({email})
        const usernameExists = await User.findOne({username})
    
        if (emailExists) {
            return res.status(422).json({error: 'Email already taken.'});
        }
        if (usernameExists) {
            return res.status(422).json({error: 'username already taken.'});
        }
    
        if (password != confirmed_password) {
            return res.status(422).json({error: 'Confirm password doesn\'t matched.'});
        }
    
        const user = new User({
            username, first_name, last_name, email, password
        });
    
        if (await user.save()) {
            return res.status(200).json({message: "Successfully registered."})
        }
    } catch (error) {
        return res.status(500).json({message: "Some error occourred, please try again."})
    }
}

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(403).json({errors: {message: "Invalid Email or Password"}});
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(403).json({errors: {message: "Invalid Email or Password"}});
        }

        req.user = user;
        const token = jwt.sign(
            {
                _id: user._id, username: user.username, first_name: user.first_name, last_name: user.last_name, username: user.email, followers: user.followers, followings: user.followings
            }, process.env.JWT_KEY)
        user.password = undefined;
        user.__v = undefined;
        res.status(200).send({
            user,
            token_type: 'Bearer',
            access_token: token
        })
    } catch (error) {
        res.status(500).send({
            message: 'Some error occourred, please try again.',
        })
    }
}