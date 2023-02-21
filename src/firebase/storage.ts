import { uploadBytes, ref, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from ".";

export const uploadFile = async (path: string, file: File): Promise<string | null> => {
	const storageRef = ref(storage, path);
	try {
		await uploadBytes(storageRef, file);
		const downloadURL = await getDownloadURL(storageRef);
		return downloadURL;
	} catch (e) {
		console.error("Error uploading file:", e);
		return null;
	}
};

export const deleteFile = async (path: string): Promise<void> => {
	const storageRef = ref(storage, path);
	try {
		await deleteObject(storageRef);
	} catch (e) {
		console.error("Error deleting file:", e);
	}
};

export const getFileURL = async (path: string): Promise<string | null> => {
	const storageRef = ref(storage, path);
	try {
		const downloadURL = await getDownloadURL(storageRef);
		return downloadURL;
	} catch (e) {
		console.error("Error getting file download URL:", e);
		return null;
	}
};

export const downloadFile = async (path: string): Promise<Blob | null> => {
	const storageRef = ref(storage, path);
	try {
		const url = await getDownloadURL(storageRef);
		const response = await fetch(url);
		const blob = await response.blob();
		return blob;
	} catch (e) {
		console.error("Error downloading file:", e);
		return null;
	}
};