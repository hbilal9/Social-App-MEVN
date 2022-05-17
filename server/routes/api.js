const express = require('express');
const router = express.Router();

// middleswares
const validation = require('../app/middlewares/ValidatorMiddleware');

// controllers imports
const { register, login } = require('../app/controllers/AuthController');

// Validators
const registerValidator = require('../app/validations/registerValidator');

router.get('/', (req, res) => {
    res.status(200).json('Hello world');
});


router.post('/register',validation(registerValidator), register);
router.post('/login', login);



module.exports = router;