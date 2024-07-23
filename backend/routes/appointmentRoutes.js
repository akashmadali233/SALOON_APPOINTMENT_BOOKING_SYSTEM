const express = require('express');
const { createAppointment, getAllAppointments, updateAppointment, deleteAppointment } = require('../controllers/appointmentController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', auth, createAppointment);
router.get('/', auth, getAllAppointments);
router.post('/update', auth, updateAppointment);
router.delete('/:id', auth, deleteAppointment);

module.exports = router;
