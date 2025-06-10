import { Buffer } from 'node:buffer';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure_url: true
});

const cloudUploader = async (req, res, next) => {
  if (!req.file) throw new Error('Please upload an image', { cause: 400 });

  const b64 = Buffer.from(req.file.buffer).toString('base64');
  const dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;

  const cloudinaryData = await cloudinary.uploader.upload(dataURI, { resource_type: 'auto' });
  //   console.log(cloudinaryData.secure_url);

  req.body.image = cloudinaryData.secure_url;
  next();
};

export default cloudUploader;
