import { superValidate } from 'sveltekit-superforms/server';
import { newContactSchema } from './schema.js';
import { client } from '../../../backend/client.js';
import { UserExist, type UserExistTypes } from '../../../backend/query.js';

export const load = async (event) => {
	const form = await superValidate(event, newContactSchema);
	console.Console;
	console.log('the vent', form);
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
			if (res.users.length === 0) {
				return {
					form,
					out: {
						status: 200,
						message: 'You can Login'
					}
				};
			} else {
				return {
					form,
					out: {
						status: 200,
						message: 'User Already Exist'
					}
				};
			}
		} catch (error) {
			console.log(error);
			return {
				form,
				out: {
					status: 400,
					body: { error: 'error making backend request' }
				}
			};
		}
	}
};
