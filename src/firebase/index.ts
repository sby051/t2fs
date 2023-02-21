import * as env from "$env/static/public"; // TODO: Change to env private
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const FIREBASE_CONFIG = {
	apiKey: env.FIREBASE_API_KEY,
	authDomain: env.FIREBASE_AUTH_DOMAIN,
	projectId: env.FIREBASE_PROJECT_ID,
	storageBucket: env.FIREBASE_STORAGE_BUCKET,
	databaseURL: env.FIREBASE_DATABASE_URL,
	appId: env.FIREBASE_APP_ID,
};

const app = initializeApp(FIREBASE_CONFIG);
export const auth = getAuth(app);
export const fsdb = getFirestore(app);
export const rtdb = getDatabase(app);
export const storage = getStorage(app);