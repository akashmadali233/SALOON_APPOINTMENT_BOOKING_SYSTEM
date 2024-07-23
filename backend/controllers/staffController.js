const Staff = require('../models/Staff');

exports.createStaff = async (req, res) => {
  try {
    const { name, specialization, availability } = req.body;
    if(!name && !specialization && !availability){
        res.status(400).json({
          message : "Please Enter all the Feilds"
        });
    }

    // Create new staff member
    const staff = await Staff.create({ name, specializations : specialization, availability });

    res.status(201).json({ message: 'Staff created successfully', staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAllStaff = async (req, res) => {
  try {
    // Get all staff members
    const staff = await Staff.findAll();

    res.status(200).json(staff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const { name, specialization, availability } = req.body;
    if(!name || !specialization || !availability){
        res.status(400).json({
          message : "Please Enter all the Feilds"
        });
    }
    
    // Find staff member by ID
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Update staff details
    staff.name = name || staff.name;
    staff.specialization = specialization || staff.specialization;
    staff.availability = availability || staff.availability;

    // Save changes
    await staff.save();

    res.json({ message: 'Staff updated successfully', staff });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteStaff = async (req, res) => {
  try {
    const staffId = req.params.id;

    // Find staff member by ID
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    // Delete staff member
    await staff.destroy();

    res.json({ message: 'Staff deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
