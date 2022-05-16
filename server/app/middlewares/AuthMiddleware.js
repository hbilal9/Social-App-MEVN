const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(403).json('Unauthorized.')
    }
    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        if(err){
            return res.status(403).json('Unauthorized.')
        }
        User.findById(payload._id).then(user => {
            user.password = undefined;
            user.__v = undefined;
            req.user = user;
            next();
        })
    })
}