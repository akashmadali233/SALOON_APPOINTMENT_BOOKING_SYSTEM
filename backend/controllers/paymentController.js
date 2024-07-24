const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const Appointment = require('../models/Appointment');
const User = require('../models/User');

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.processPayment = async (req, res) => {
  try {
    const { amount, currency, receipt, appointmentId } = req.body;

    if(!amount && !currency && !receipt && !appointmentId){
        res.status(400).json({
          message : "Please Enter all the Feilds"
        });
    }

    // Create Razorpay order
    const options = {
      amount: amount * 100, 
      currency: currency,
      receipt: receipt
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      orderId: order.id,
      appointmentId: appointmentId,
      amount: amount,
      currency: currency,
      status: 'created'
    });

    res.status(201).json({ message: 'Payment initiated successfully', order, payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.generateInvoice = async (req, res) => {
  try {
    const { paymentId } = req.body;
   
    const payment = await Payment.findByPk(paymentId, {
      include: [
        {
          model: Appointment,
          include: [
            { model: User, attributes: ['name', 'email'] }
          ]
        }
      ]
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    const { Appointment: appointment, amount, currency, createdAt } = payment;
    const { User: user } = appointment;

    // Generate invoice details
    const invoice = {
      user: {
        name: user.name,
        email: user.email
      },
      appointment: {
        date: appointment.date,
        time: appointment.time
      },
      payment: {
        amount: amount,
        currency: currency,
        date: createdAt
      }
    };

    // Send invoice as response (In a real application, you might want to generate a PDF and email it to the user)
    res.status(200).json({ message: 'Invoice generated successfully', invoice });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
