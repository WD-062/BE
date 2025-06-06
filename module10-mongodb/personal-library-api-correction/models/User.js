import { Schema, model } from 'mongoose';

const readingListSchema = new Schema({
  bookRefId: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  status: {
    type: String,
    enum: ['read', 'not read', 'pending'],
    default: 'pending'
  }
});

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [2, 'min length is 2 chars'],
    maxLength: 100
  },
  lastName: {
    type: String,
    required: true,
    minLength: [2, 'min length is 2 chars'],
    maxLength: 100
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  readingList: {
    type: [readingListSchema],
    default: () => []
  }
});

export default model('User', userSchema);
