import bcrypt from 'bcrypt';

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
		return isMatch;
	} catch (error) {
		console.error('Error verifying password:', error);
		throw error;
	}
}
