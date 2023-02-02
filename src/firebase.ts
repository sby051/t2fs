import type { UID } from "@types";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import {
	deleteDoc as delDoc,
	doc,
	getDoc,
	getFirestore,
	setDoc,
	updateDoc as upDoc,
	type DocumentData,
} from "firebase/firestore";

const FIREBASE_CONFIG = {
    apiKey: "AIzaSyAXD0Hi4PipmkFMxS1p5k6OHt4MfkssX7I",
    authDomain: "clubs-at-setu.firebaseapp.com",
    projectId: "clubs-at-setu",
    storageBucket: "clubs-at-setu.appspot.com",
    messagingSenderId: "402071521803",
    appId: "1:402071521803:web:123d425975d00fd88f150e"
  };

const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const fsdb = getFirestore(app);
export const rtdb = getDatabase(app);

/**
 * @description Get a document from a Firestore collection
 * @param {string} collection A string representing the collection name
 * @param {string} docId A string representing the document id
 * @returns {Promise<DocumentData | null>} A promise that resolves to a DocumentData object or null
 */
export const fetchDoc = async (collection: string, docId: UID): Promise<DocumentData | null> => {
	const docSnapshot = await getDoc(doc(fsdb, collection, docId));
	return docSnapshot.exists() ? docSnapshot.data() : null;
};

/**
 * @description Create a document in a Firestore collection
 * @param {string} collection A string representing the collection name
 * @param {string} docId A string representing the document id
 * @param {DocumentData} data A DocumentData object representing the document data
 * @returns {Promise<boolean>} A promise that resolves to a boolean, indicating whether the document was created successfully
 */
export const createDoc = async (collection: string, docId: UID, data: unknown): Promise<boolean> => {
	if (!(await docExists(collection, docId))) return false;
	try {
		await setDoc(doc(fsdb, collection, docId), data);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * @description Update a document in a Firestore collection
 * @param {string} collection A string representing the collection name
 * @param {string} docId A string representing the document id
 * @param {DocumentData} data A DocumentData object representing the document data
 * @returns {Promise<boolean>} A promise that resolves to a boolean, indicating whether the document was updated successfully
 */

export const updateDoc = async (collection: string, docId: UID, data: Partial<unknown>): Promise<boolean> => {
	if (!(await docExists(collection, docId))) return false;
	try {
		await upDoc(doc(fsdb, collection, docId), data);
		return true;
	} catch (e) {
		return false;
	}
};

/**
 * @description Delete a document from a Firestore collection
 * @param {string} collection A string representing the collection name
 * @param {string} docId A string representing the document id
 * @returns {Promise<boolean>} A promise that resolves to a boolean, indicating whether the document was deleted successfully
 * @todo Add a check to see if the document exists before deleting it
 */

export const deleteDoc = async (collection: string, docId: UID): Promise<boolean> => {
	if (!(await docExists(collection, docId))) return false;
	try {
		await delDoc(doc(fsdb, collection, docId));
		return true;
	} catch (e) {
		return false;
	}
};

export const docExists = async (collection: string, docId: UID): Promise<boolean> =>
	(await getDoc(doc(fsdb, collection, docId))).exists();
