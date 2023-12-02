import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, THE_PLATFORM } from '$env/static/private';

export async function encryptPassword(password: string) {
	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		console.error('Error encrypting password:', error);
		throw error;
	}
}

export async function verifyPassword(storedPassword: string, enteredPassword: string) {
	try {
		const isMatch = await bcrypt.compare(enteredPassword, storedPassword);
		if (!isMatch) {
			throw new Error("password don't match");
		}
		return isMatch;
	} catch (error) {
		console.error('Error verifying password:', error);
		throw error;
	}
}

export function generateToken(userId: string) {
	const payload = {
		id: userId,
		'X-Hasura-User-Id': userId,
		'https://hasura.io/jwt/claims': {
			'x-hasura-allowed-roles': ['user'],
			'x-hasura-default-role': 'user',
			'X-Hasura-User-Id': userId
		}
	};

	const secretKey = JWT_SECRET;
	const options = {
		expiresIn: '30d'
	};

	return jwt.sign(payload, secretKey, options);
}

export async function canWeUseTheEmail(email: string) {
	type commentType = {
		postId: number;
		id: number;
		name: string;
		email: string;
		body: string;
	};
	try {
		const response = await fetch(THE_PLATFORM);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const comments = await response.json();

		return comments.some((comment: commentType) => comment.email === email);
	} catch (error) {
		console.error('There was an error fetching the comments:', error);
		return false;
	}
}
