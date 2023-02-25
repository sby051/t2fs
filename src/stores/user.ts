// import { getDocument, updateDocument } from "@fb/fsdb";
// import { auth } from "@fb";
// import type { User as FirebaseUser } from "firebase/auth";
// import { onAuthStateChanged } from "firebase/auth";
import type { User } from "@types";
import { writable } from "svelte/store";

const user = writable<User | null>(null);
export const authed = writable<boolean | null>(null); // Used to check if user is logged in, null = pending

// Never use the user store to check auth state, use authed instead as it provides a null state for pending (so you can show a loading screen)

// onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
// 	if(!firebaseUser) {
// 		authed.set(false);
// 		user.set(null);
// 		return;
// 	}
// 	const userDoc = await getDocument<User>("users", firebaseUser.uid);
// 	user.set(userDoc);
// 	authed.set(true);
// });

// user.subscribe(async (u) => {
// 	if(!u) return;
// 	await updateDocument("users", u.id, u);
// })

export default user;