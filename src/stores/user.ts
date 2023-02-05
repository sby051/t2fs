import { auth, createDoc, fetchDoc } from "@fb";
import { onAuthStateChanged } from "firebase/auth";
import { writable } from "svelte/store";

export const currentUser = writable<any>(null);

onAuthStateChanged(auth, (firebaseUser: any) => {
	if (!firebaseUser) {
		currentUser.set(null);
		return;
	}
	fetchDoc("users", firebaseUser.uid).then((doc: any) => currentUser.set(doc));
});
