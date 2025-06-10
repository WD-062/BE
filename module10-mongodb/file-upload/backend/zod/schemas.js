import { z } from 'zod/v4';

const userSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  email: z.email('Invalid email.'),
  image: z
    .url({
      protocol: /^https?$/,
      hostname: z.regexes.domain
    })
    .optional()
});

export { userSchema };
