import { isValidObjectId } from 'mongoose';
import Post from '../models/Post.js';

export const getPosts = async (req, res) => {
  const posts = await Post.find().lean().populate('author', 'firstName lastName');
  res.status(200).json(posts);
};

export const createPost = async (req, res) => {
  const { sanitizedBody } = req;
  const post = await Post.create(sanitizedBody);
  const postWithAuthor = await post.populate('author', 'firstName lastName');
  res.status(201).json(postWithAuthor);
};

export const getPostById = async (req, res) => {
  const {
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
  const post = await Post.findById(id).lean().populate('author', 'firstName lastName');
  if (!post) throw new Error('Post not found', { cause: 404 });
  res.status(200).json(post);
};

export const updatePost = async (req, res) => {
  const {
    sanitizedBody,
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
  const updatedPost = await Post.findByIdAndUpdate(id, sanitizedBody, { new: true });
  if (!updatedPost) throw new Error('Post not found', { cause: 404 });
  const postWithAuthor = await updatedPost.populate('author', 'firstName lastName');
  res.status(200).json(postWithAuthor);
};

export const deletePost = async (req, res) => {
  const {
    params: { id }
  } = req;
  if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
  const post = await Post.findByIdAndDelete(id);
  if (!post) throw new Error('Post not found', { cause: 404 });
  res.status(200).json({ message: 'Post deleted successfully' });
};
