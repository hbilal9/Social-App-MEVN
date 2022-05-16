const express = require('express');
const router = express.Router();

// controllers imports
const { register, login } = require('../app/controllers/AuthController');


router.get('/', (req, res) => {
    res.status(200).json('Hello world');
});


router.post('/register', register);
router.post('/login', login);



module.exports = router;