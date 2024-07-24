const express = require('express');
const { processPayment, generateInvoice } = require('../controllers/paymentController');
const router = express.Router();

router.post('/', processPayment);
router.post('/invoice', generateInvoice);

module.exports = router;
