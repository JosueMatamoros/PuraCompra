import User from '../models/users.js';

export const getUsers = async (request, response) => {
  try {
    const users = await User.findAll({
      include: 'Addresses',
    });
    response.json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getUserById = async (request, response) => {
  try {
    const user = await User.findByPk(request.params.id, {
      include: 'Addresses',
    }
    );
    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};