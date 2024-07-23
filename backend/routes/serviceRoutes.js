const express = require('express');
const { createService, getAllServices, updateService, deleteService } = require('../controllers/serviceController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, createService);
router.get('/', getAllServices);
router.post('/update', auth, updateService);
router.post('/delete', auth, deleteService);

module.exports = router;

