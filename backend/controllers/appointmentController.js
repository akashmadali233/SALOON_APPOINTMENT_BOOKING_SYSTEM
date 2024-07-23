const Appointment = require('../models/Appointment');
const User = require('../models/User');
const Staff = require('../models/Staff');
const Service = require('../models/Service');
const { json } = require('sequelize');

exports.createAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    
    const {staffId, serviceId, date, time} = req.body;
    if(!userId && !staffId && !serviceId && !date && !time){
        res.status(400).json({
          message : "Please Enter all the Feilds"
      });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    const appointment = await Appointment.create({
      UserId : userId,
      StaffId: staff.id,
      ServiceId: service.id,
      date,
      time,
      status: 1
    });

  res.status(201).json({ message: 'Appointment created successfully', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllAppointments = async (req, res) => {
  try {
    
    const appointments = await Appointment.findAll({
      include: [
        { model: User, attributes: ['name', 'email'] },
        { model: Staff, attributes: ['name', 'specializations'] }, // Removed 'specialization'
        { model: Service, attributes: ['name', 'description', 'price'] }
      ]
    });

    res.status(200).json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateAppointment = async (req, res) => {
  try {
    const userId =  req.user.id

    const { appointmentId, staffId, serviceId, date, time} = req.body;

    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    appointment.UserId = userId || appointment.UserId;
    appointment.StaffId = staffId || appointment.StaffId;
    appointment.ServiceId = serviceId || appointment.ServiceId;
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    
    await appointment.save();

    res.json({ message: 'Appointment updated successfully', appointment });
  } catch (error) {
    console.error(error);
    res.status (500).json({ message: 'Server error' });
  }
};



exports.deleteAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const appointmentId = req.params.id;

    const appointment = await Appointment.findByPk(appointmentId);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    if (appointment.UserId !== userId) {
      return res.status(403).json({ message: 'Unauthorized to delete this appointment' });
    }

    await appointment.destroy();

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

