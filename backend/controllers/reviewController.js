const Review = require('../models/Review');
const User = require('../models/User');
const Service = require('../models/Service');

exports.leaveReview = async (req, res) => {
  try {
    const { rating, comment, serviceId } = req.body;
    const userId = req.user.id; // Assuming you have user authentication and user ID is stored in req.user

    // Validate the service exists
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Create the review
    const review = await Review.create({
      userId,
      serviceId,
      rating,
      comment
    });

    res.status(201).json({ message: 'Review left successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getServiceReviews = async (req, res) => {
  try {
    const { serviceId } = req.params;

    // Validate the service exists
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Get reviews for the service
    const reviews = await Review.findAll({
      where: { serviceId },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.respondToReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { response } = req.body;

    // Find the review
    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update the review with the response
    review.response = response;
    await review.save();

    res.status(200).json({ message: 'Response added successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
