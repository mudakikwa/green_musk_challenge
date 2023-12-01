import { z } from 'zod';

export const createUser = z.object({
	fullname: z.string(),
	email: z.string().email(),
	password: z.string().min(8, 'Password must be at least 8 characters long')
});
