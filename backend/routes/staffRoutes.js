const express = require('express');
const { createStaff, getAllStaff, updateStaff, deleteStaff } = require('../controllers/staffController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, createStaff);
router.get('/', getAllStaff);
router.put('/:id', auth, updateStaff);
router.delete('/:id', auth, deleteStaff);

module.exports = router;
