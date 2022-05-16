const User = require('../models/User');

exports.register = async (req, res) => {
    const { username, first_name, last_name, email, password, confirmed_password } = req.body;

    try {
        const exists = await User.findOne({email})
    
        if (exists) {
            return res.status(422).json({error: 'Email already taken.'});
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