import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { getUserById, updateUser } from '../data/users';
import Preview from './Preview';

const EditForm = () => {
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: null
  });

  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        // replace with id of user in your database
        const userData = await getUserById('6847f202dd77e4043a25e72b');
        if (!ignore) {
          const { firstName, lastName, email, image } = userData;
          setForm({ firstName, lastName, email, image });
          setImagePreview(image);
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = e => {
    if (e.target.name === 'image') {
      // console.log(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
    setForm(prev =>
      e.target.type === 'file'
        ? { ...prev, [e.target.name]: e.target.files[0] }
        : { ...prev, [e.target.name]: e.target.value }
    );
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData(e.target);

      const { firstName, lastName, email, image } = await updateUser({
        id: '6847f202dd77e4043a25e72b',
        formData
      });

      setImagePreview(image);

      setForm({ firstName, lastName, email, image });
      toast.success('Profile updated');
    } catch (error) {
      console.error(error);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto'>
      <h1 className='text-center text-4xl'>File upload</h1>
      <form className='mt-5 w-1/2 mx-auto flex flex-col items-center gap-5' onSubmit={handleSubmit}>
        <label className='input input-bordered flex items-center gap-2 w-full'>
          First Name:
          <input value={form.firstName} onChange={handleChange} type='text' name='firstName' className='grow' />
        </label>
        <label className='input input-bordered flex items-center gap-2 w-full'>
          Last Name:
          <input value={form.lastName} onChange={handleChange} type='text' name='lastName' className='grow' />
        </label>
        <label className='input input-bordered flex items-center gap-2 w-full'>
          Email:
          <input value={form.email} onChange={handleChange} type='text' name='email' className='grow' />
        </label>

        {/* <label className='input input-bordered flex items-center gap-2 w-full'>
          Image:
          <input value={form.image} onChange={handleChange} type='text' name='image' className='grow' />
          </label> */}
        <input onChange={handleChange} type='file' name='image' className='file-input input-bordered w-full' />

        <button type='submit' className='btn btn-block' disabled={loading}>
          Upload
        </button>
      </form>
      {imagePreview && <Preview image={imagePreview} />}
    </div>
  );
};

export default EditForm;
