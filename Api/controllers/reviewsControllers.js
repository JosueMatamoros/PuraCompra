import Reviews from '../models/reviews.js';

export const createReview = async (request, response) => {
  try {
    const { reviewsId, UsersId, ProductsId, title, body, star, date } = request.body;
    const newReview = await Reviews.create({ reviewsId, UsersId, ProductsId, title, body, star, date: date || new Date() });
    response.status(201).json(newReview);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getReviews = async (request, response) => {
  try {
    const reviews = await Reviews.findAll();
    response.status(200).json(reviews);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const getReviewById = async (request, response) => {
  try {
    const { id } = request.params;
    const review = await Reviews.findByPk(id);
    if (review) {
      response.status(200).json(review);
    } else {
      response.status(404).json({ message: `Review with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateReview = async (request, response) => {
  try {
    const { id } = request.params;
    const { UsersId, ProductsId, title, body, star, date } = request.body;
    const [updated] = await Reviews.update({ UsersId, ProductsId, title, body, star, date: date || new Date() }, {
      where: { reviewsId: id }
    });
    if (updated) {
      const updatedReview = await Reviews.findByPk(id);
      response.status(200).json(updatedReview);
    } else {
      response.status(404).json({ message: `Review with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const deleteReview = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await Reviews.destroy({
      where: { reviewsId: id }
    });
    if (deleted) {
      response.status(204).json({ message: 'Review deleted' });
    } else {
      response.status(404).json({ message: `Review with id ${id} not found` });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
