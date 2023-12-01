import { GraphQLClient } from 'graphql-request';
import { HASURA_URL, HASURA_ADMIN_SECRET } from '$env/static/private';
const HASURA_ENDPOINT = HASURA_URL; // Replace with your Hasura endpoint

const headers = {
	'Content-Type': 'application/json',
	'x-hasura-admin-secret': `${HASURA_ADMIN_SECRET}`
};

export const client = new GraphQLClient(HASURA_ENDPOINT, { headers });
