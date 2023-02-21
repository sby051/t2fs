import type { User } from "@types";
import { auth } from ".";
import { createDocument, deleteDocument, getCollection } from "./fsdb";
import { createUserWithEmailAndPassword, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updatePassword } from "firebase/auth";
import { getDocument } from "./fsdb";

export const signUp = async (user: User): Promise<boolean> => {
	const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);

	const { uid } = userCredential.user;

	if (!uid) return false;

	delete user.password;
	user.id = uid;

	if (!(await createDocument("users", uid, user))) return false;

	return true;
};

export const logout = async (): Promise<void> => await signOut(auth);

export const login = async (email: string, password: string): Promise<boolean> => {
	try {
		await signInWithEmailAndPassword(auth, email, password);
		return true;
	} catch (e) {
		return false;
	}
};

export const deleteAccount = async (): Promise<boolean> => {
	if (!(await deleteDocument("users", auth.currentUser?.uid))) return false;
	try {
		await auth.currentUser?.delete();
		return true;
	}
	catch (e) {
		return false;
	}
};

export const isEmailUsed = async (email: string): Promise<boolean> => {
	const users = await getCollection<User>("users");
	return users.some((user) => user.email === email);
};

export const changePassword = async (password: string): Promise<boolean> => {
	try {
		await updatePassword(auth.currentUser, password);
		return true;
	} catch (e) {
		return false;
	}
}

export const reauthenticate = async (password: string): Promise<boolean> => {
	try {
		await reauthenticateWithCredential(auth.currentUser, {
			email: auth.currentUser?.email,
			password
		});
		return true;
	} catch (e) {
		console.log(e);
		return false;
	}
}