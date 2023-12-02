import { superValidate } from 'sveltekit-superforms/server';
import { createUser } from './schema.js';
import { client } from '../../../backend/client.js';
import { createUserBack, type createUserType } from '../../../backend/mutation.js';
import { UserExist, type UserExistTypes } from '../../../backend/query.js';
import { canWeUseTheEmail, encryptPassword } from '../shared.js';

export const load = async (event) => {
	const form = await superValidate(event, createUser);
	return {
		form
	};
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, createUser);

		// check if we can use the email
		const canWe = await canWeUseTheEmail(form.data.email);
		if (!canWe) {
			return {
				form,
				out: {
					status: 400,
					message: "We can't use this email"
				}
			};
		}
		const userExistVariables: UserExistTypes = {
			email_address: form.data.email
		};

		try {
			const userExistRes = await client.request<any>(UserExist, userExistVariables);
			if (userExistRes.users.length) {
				return {
					form,
					out: {
						status: 400,
						message: 'Email Already Exist'
					}
				};
			}

			const encryptedPassword = await encryptPassword(form.data.password);
			const variables: createUserType = {
				email_address: form.data.email,
				fullname: form.data.fullname,
				password: encryptedPassword
			};
			const res = await client.request(createUserBack, variables);
			if (res) {
				return {
					form,
					out: {
						status: 200,
						message: 'User Created'
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
