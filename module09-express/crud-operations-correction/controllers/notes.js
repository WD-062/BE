import Note from '../models/Note.js';
import User from '../models/User.js';
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ include: User });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { UserId, title, content } = req.body;
    if (!UserId || !title || !content) return res.status(400).json({ error: 'UserId, title and content are required' });
    const note = await Note.create(req.body);
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id, { include: User });

    if (!note) return res.status(404).json({ error: 'Note not found' });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { UserId, title, content } = req.body;
    const { id } = req.params;
    if (!UserId || !title || !content) return res.status(400).json({ error: 'UserId, title and content are required' });

    const note = await Note.findByPk(id);

    if (!note) return res.status(404).json({ error: 'Note not found' });

    await note.update(req.body);

    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByPk(id);

    if (!note) return res.status(404).json({ error: 'Note not found' });

    await note.destroy();

    res.json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllNotes, createNote, getNoteById, updateNote, deleteNote };
