const express = require('express');
const router = express.Router();

// middleswares
const validation = require('../app/middlewares/ValidatorMiddleware');
const checkAuth = require('../app/middlewares/AuthMiddleware');

// Validators
const registerValidator = require('../app/validations/registerValidator');

router.get('/', (req, res) => {
    res.status(200).json('Hello world');
});


const { register, login } = require('../app/controllers/AuthController');
router.post('/register',validation(registerValidator), register);
router.post('/login', login);

const { getConversation, createConversation } = require('../app/controllers/ConversationController');
router.get('/conversations/:userId', checkAuth, getConversation);
router.post('/conversations', checkAuth, createConversation);


module.exports = router;