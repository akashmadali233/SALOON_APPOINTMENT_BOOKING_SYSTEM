const Service = require('../models/Service');


exports.createService = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;

    if(!name && !description && !duration && !price){
        res.status(400).json({
          message : "Please Enter all the Feilds"
        });
    }

    const service = await Service.create({ name, description, duration, price });

    res.status(201).json({ message: 'Service created successfully', service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllServices = async (req, res) => {
  try {
    // Get all services
    const services = await Service.findAll();

    res.status(200).json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateService = async (req, res) => {
  try {
    const serviceId = req.body.id;
    const { name, description, duration, price } = req.body;
    if(!name || !description || !duration || !price){
        res.status(400).json({
          message : "Please Enter all the Feilds"
        });
    }
    // Find service by ID
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Update service details
    service.name = name || service.name;
    service.description = description || service.description;
    service.duration = duration || service.duration;
    service.price = price || service.price;

    // Save changes
    await service.save();

    res.json({ message: 'Service updated successfully', service });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteService = async (req, res) => {
  try {
    const serviceId = req.body.id;
    
    // Find service by ID
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Delete service
    await service.destroy();

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


