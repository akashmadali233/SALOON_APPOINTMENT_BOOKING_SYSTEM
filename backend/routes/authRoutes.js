const express = require('express');
const { register, login, updateProfile } = require('../controllers/authController');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.put('/profile', auth, updateProfile);

module.exports = router;
