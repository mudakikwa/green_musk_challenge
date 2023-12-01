import { gql, type Variables } from 'graphql-request';

export const createUserBack = gql`
	mutation CREATE_USER($email_address: String!, $fullname: String!, $password: String!) {
		insert_users_one(
			object: { email_address: $email_address, fullname: $fullname, password: $password }
		) {
			id
		}
	}
`;

export interface createUserType extends Variables {
	email_address: string;
	fullname: string;
	password: string;
}
