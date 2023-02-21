import { fsdb } from ".";
import type { FirestoreCollection } from "./types";
import type { ID } from "@types";
import { doc, getDoc, getDocs, setDoc, collection as cltn, updateDoc, deleteDoc } from "firebase/firestore";

export const getDocument = async <ExpectedDocument>(collection: string, docId: ID): Promise<ExpectedDocument | null> => {
	const docSnapshot = await getDoc(doc(fsdb, collection, docId));
	return docSnapshot.exists() ? (docSnapshot.data() as ExpectedDocument) : null;
};

export const getDocuments = async <ExpectedDocument>(collection: string, docIds: ID[]): Promise<ExpectedDocument[]> => {
	const docs = await Promise.all(docIds.map((docId) => getDocument<ExpectedDocument>(collection, docId)));
	return docs.filter((doc) => doc !== null) as ExpectedDocument[];
};

export const getCollection = async <ExpectedDocument>(collection: string): Promise<FirestoreCollection<ExpectedDocument>> => {
	const querySnapshot = await getDocs(cltn(fsdb, collection));
	return querySnapshot.docs.reduce((acc, doc) => {
		acc[doc.id] = doc.data() as ExpectedDocument;
		return acc;
	}, {} as FirestoreCollection<ExpectedDocument>);
};

export const createDocument = async (collection: string, docId: ID, data: unknown): Promise<boolean> => {
	if (await documentExists(collection, docId)) return false;
	try {
		await setDoc(doc(fsdb, collection, docId), data);
		return true;
	} catch (e) {
		return false;
	}
};

export const createDocuments = async (collection: string, data: unknown[]): Promise<boolean> => {
	try {
		data.forEach(async (obj) => {
			obj.id = crypto.randomUUID();
			await createDocument(collection, obj.id, obj)
		});
		return true;
	} catch (e) {
		return false;
	}
}

export const updateDocument = async (collection: string, docId: ID, data: Partial<unknown>): Promise<boolean> => {
	if (!(await documentExists(collection, docId))) return false;
	try {
		await updateDoc(doc(fsdb, collection, docId), data);
		return true;
	} catch (e) {
		return false;
	}
};

export const updateDocuments = async (collection: string, docIds: ID[], data: Partial<unknown>): Promise<boolean> => {
	try {
		docIds.forEach((docId) => updateDoc(doc(fsdb, collection, docId), data));
		return true;
	} catch (e) {
		return false;
	}
};

export const deleteDocument = async (collection: string, docId: ID): Promise<boolean> => {
	if (!(await documentExists(collection, docId))) return false;
	try {
		await deleteDoc(doc(fsdb, collection, docId));
		return true;
	} catch (e) {
		return false;
	}
};

export const deleteDocuments = async (collection: string, docIds: ID[]): Promise<boolean> => {
	try {
		docIds.forEach((docId) => deleteDoc(doc(fsdb, collection, docId)));
		return true;
	} catch (e) {
		return false;
	}
};

export const documentExists = async (collection: string, docId: ID): Promise<boolean> =>
	(await getDoc(doc(fsdb, collection, docId))).exists();