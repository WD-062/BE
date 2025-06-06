import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: [1, 'min length is 1 chars'],
    maxLength: 255
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    minLength: [13, 'ISBN must be at least 13 characters long'],
    maxLength: [17, 'ISBN cannot be longer than 17 characters long']
  },
  author: {
    type: String,
    required: true
  }
});

export default model('Book', bookSchema);
