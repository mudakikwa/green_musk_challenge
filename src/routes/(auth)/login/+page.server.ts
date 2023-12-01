import { superValidate } from 'sveltekit-superforms/server';
import { newContactSchema } from './schema.js';
import { client } from '../../../backend/client.js';
import { UserExist, type UserExistTypes } from '../../../backend/query.js';
import { generateToken, verifyPassword } from '../shared.js';

export const load = async (event) => {
	const form = await superValidate(event, newContactSchema);
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, newContactSchema);
		const variables: UserExistTypes = {
			email_address: form.data.email
		};

		try {
			const res = await client.request<any>(UserExist, variables);
			try {
				await verifyPassword(res.users[0].password, form.data.password);
				return {
					form,
					out: {
						status: 200,
						message: 'You can continue',
						token: generateToken(res.users[0].id)
					}
				};
			} catch (error) {
				return {
					form,
					out: {
						status: 400,
						message: 'Invalid password or username'
					}
				};
			}
		} catch (error) {
			console.log(error);
			return {
				form,
				out: {
					status: 400,
					message: 'error making backend request'
				}
			};
		}
	}
};
