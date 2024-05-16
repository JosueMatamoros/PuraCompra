import User from '../models/users.js';
import Addresses from '../models/addresses.js';

export const createUser = async (request, response) => {
  try {
    const { UsersID, name, lastname, mail, phoneNumber } = request.body;
    const newUser = await User.create({ UsersID, name, lastname, mail, phoneNumber });
    response.status(201).json(newUser);
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
};

export const getUsers = async (request, response) => {
  try {
    const users = await User.findAll({
      include: [Addresses],
    });
    response.json(users);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getUserById = async (request, response) => {
  try {
    const user = await User.findByPk(request.params.id, {
      include: [Addresses],
    });
    if (user) {
      response.json(user);
    } else {
      response.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const updateUser = async (request, response) => {
  try {
    const { id } = request.params;
    const { name, lastname, mail, phoneNumber } = request.body; // Desestructurar los campos específicos

    const [updated] = await User.update({ name, lastname, mail, phoneNumber }, {
      where: { UsersID: id }
    });

    if (updated) {
      const updatedUser = await User.findByPk(id);
      response.status(200).json(updatedUser);
    } else {
      response.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (request, response) => {
  try {
    const { id } = request.params;
    const deleted = await User.destroy({
      where: { UsersID: id }
    });
    if (deleted) {
      response.status(204).json({ message: 'User deleted' });
    } else {
      response.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};
