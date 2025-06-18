import { isValidObjectId } from 'mongoose';
import Duck from '../models/Ducks.js';

const getAllDucks = async (req, res) => {
  const ducks = await Duck.find().lean().populate('owner', 'firstName lastName');
  res.json(ducks);
};

const createDuck = async (req, res) => {
  const newDuck = await Duck.create(req.sanitizedBody);

  res.status(201).json(newDuck);
};

const getDuckById = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const duck = await Duck.findById(id).lean().populate('owner', 'firstName lastName');

  if (!duck) throw new Error('Duck not found', { cause: 404 });

  res.json(duck);
};
const updateDuck = async (req, res) => {
  const { id } = req.params;
  // destructure userId from the body

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  // check if userId from the body matches owner property (id of owner)

  // throw an error if they don't match

  // only allow edits if they did match
  const duck = await Duck.findByIdAndUpdate(id, req.sanitizedBody, { new: true });

  if (!duck) throw new Error('Duck not found', { cause: 404 });

  const duckWithOwner = await duck.populate('owner', 'firstName lastName');

  res.json(duckWithOwner);
};

const deleteDuck = async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });

  const duck = await Duck.findByIdAndDelete(id);

  if (!duck) throw new Error('Duck not found', { cause: 404 });

  res.json({ message: 'Duck deleted successfully' });
};

export { getAllDucks, createDuck, getDuckById, updateDuck, deleteDuck };
