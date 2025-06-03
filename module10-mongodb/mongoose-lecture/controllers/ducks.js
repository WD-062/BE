import Duck from '../models/Ducks.js';
import User from '../models/User.js';

const getAllDucks = async (req, res) => {
  const ducks = await Duck.findAll({ include: User });
  res.json(ducks);
};

const createDuck = async (req, res) => {
  const newDuck = await Duck.create(req.sanitizedBody);

  res.status(201).json(newDuck);
};

const getDuckById = async (req, res) => {
  const { id } = req.params;

  const duck = await Duck.findByPk(id, { include: User });

  if (!duck) throw new Error('Duck not found', { cause: 404 });

  res.json(duck);
};
const updateDuck = async (req, res) => {
  const { id } = req.params;

  const duck = await Duck.findByPk(id, { include: User });

  if (!duck) throw new Error('Duck not found', { cause: 404 });

  await duck.update(req.sanitizedBody);

  res.json(duck);
};

const deleteDuck = async (req, res) => {
  const { id } = req.params;

  const duck = await Duck.findByPk(id);

  if (!duck) throw new Error('Duck not found', { cause: 404 });

  await duck.destroy();
  res.json({ message: 'Duck deleted successfully' });
};

export { getAllDucks, createDuck, getDuckById, updateDuck, deleteDuck };
