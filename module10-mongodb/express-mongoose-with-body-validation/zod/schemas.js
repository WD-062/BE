import { z } from 'zod/v4';

const userSchema = z.object({
  firstName: z
    .string('First name must be a string')
    .min(2, 'First name must be at least 2 characters')
    .max(255, 'First name cannot be more than 255 characters'),
  lastName: z
    .string('Last name must be a string')
    .min(2, 'Last name must be at least 2 characters')
    .max(255, 'Last name cannot be more than 255 characters'),
  email: z.email('Must be a valid email')
});

const postSchema = z.object({
  title: z
    .string('Title must be a string')
    .min(1, 'Title is required')
    .max(255, 'Title cannot have more than 255 characters'),
  content: z.string('Content must bea string').min(1, 'Content is required'),
  author: z.string().length(24)
});

export { userSchema, postSchema };
