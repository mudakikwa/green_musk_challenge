import { gql, type Variables } from 'graphql-request';

export const UserExist = gql`
	query UserExist($email_address: String) {
		users(where: { email_address: { _eq: $email_address } }) {
			id
            password
		}
	}
`;

export interface UserExistTypes extends Variables {
	email_address: string;
}

