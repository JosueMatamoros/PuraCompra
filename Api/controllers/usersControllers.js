import User from '../models/users.js';
import Addresses from '../models/addresses.js';
import jwt from 'jsonwebtoken'; // Importar el módulo de JWT para generar tokens
import path from 'path';
import config from '../config.js';
import { request } from 'express';

export const createUser = async (request, response) => {
  try {
    const {name, lastname, mail, phoneNumber } = request.body;
    const newUser = await User.create({name, lastname, mail, phoneNumber});
    if(name === undefined || lastname === undefined || mail === undefined || phoneNumber === undefined) {
      response.status(400).json({ message: 'Please provide all the information' });
    }
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
    const { name, lastname, mail, phoneNumber, gender, country } = request.body; // Desestructurar los campos específicos

    const [updated] = await User.update({ name, lastname, mail, phoneNumber, gender, country}, {
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

export const loginUsers = async (request, response) => {
  const { mail, password } = request.body;
  console.log(`Login attempt with email: ${mail}`);
  try {
    const user = await User.findOne({
       where: {mail: mail },
        include: [Addresses],
      });
    if (!user) {
      return response.status(400).json({ message: 'User not found' });
    }

    if (password !== user.password) {
      return response.status(400).json({ message: 'Invalid credentials' });
    }
    

    const token = jwt.sign({ id: user.UsersID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful', user, token);
    response.json({ user, token});
  } catch (error) {
    response.status(500).json({ message: error.message });
  };
};

export const registerUsers = async (request, response) => {
  const { name, lastname, mail, phoneNumber, password, gender, country } = request.body;
  console.log(name, lastname, mail, phoneNumber, password, gender, country);
  console.log(`Register attempt with email: ${mail}`);
  try {
    const existingUser = await User.findOne({ where: {mail: mail } });
    if (existingUser) {
      return response.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({ name, lastname, mail, phoneNumber, password, gender, country });
    const token = jwt.sign({ id: newUser.UsersID }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Registration successful', newUser, token);
    response.status(201).json({ newUser, token });
  } catch (error) {
    console.log('Error during registration:', error);
    response.status(500).json({ message: error.message });
  }
};


export const getUserDetails = async (request, response) => {
  try {
    const userID = request.user.id;
    const user = await User.findByPk(userID, {
      include: [Addresses],
    });
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    response.status(200).json(user);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

export const uploadProfilePicture = async (req, res) => {
  const { id } = req.params;
  console.log('Uploading profile picture for user ID:', id);
  console.log('File:', req.file);
  const filePath = path.join('/profileIcon', req.file.filename);

  try {
    // Actualizar la base de datos con la nueva ruta de la imagen de perfil
    const [updated] = await User.update(
      { profilePicture: filePath },
      { where: { UsersID: id } }
    );

    if (updated) {
      // Buscar el usuario actualizado
      const updatedUser = await User.findByPk(id);
      console.log('Profile picture uploaded successfully:', updatedUser);
      res.status(200).json({
        message: 'Profile picture uploaded successfully',
        filePath: filePath,
        user: updatedUser,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ message: error.message });
  }
};