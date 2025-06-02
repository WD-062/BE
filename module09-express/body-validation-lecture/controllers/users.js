import User from '../models/User.js';
import Duck from '../models/Ducks.js';

export const getUsers = async (req, res) => {
  const users = await User.findAll({ include: Duck });
  res.json(users);
};

export const createUser = async (req, res) => {
  const {
    body: { firstName, lastName, email }
  } = req;
  if (!firstName || !lastName || !email) throw new Error('firstName, lastName, and email are required', { cause: 400 });
  const user = await User.create(req.body);
  res.json(user);
};

export const getUserById = async (req, res) => {
  const {
    params: { id }
  } = req;
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found', { cause: 404 });
  res.json(user);
};

export const updateUser = async (req, res) => {
  const {
    body: { firstName, lastName, email },
    params: { id }
  } = req;
  if (!firstName || !lastName || !email) throw new Error('firstName, lastName, and email are required', { cause: 400 });
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found', { cause: 404 });
  await user.update(req.body);
  res.json(user);
};

export const deleteUser = async (req, res) => {
  const {
    params: { id }
  } = req;
  const user = await User.findByPk(id);
  if (!user) throw new Error('User not found', { cause: 404 });
  await user.destroy();
  res.json({ message: 'User deleted' });
};
