// import { auth, createDoc, fetchDoc } from "@fb";
// import type { User } from "@types";
// import { onAuthStateChanged } from "firebase/auth";
// import { writable } from "svelte/store";

// export const currentUser = writable<User | null>(null);

// onAuthStateChanged(auth, (firebaseUser) => {
// 	if (!firebaseUser) {
// 		currentUser.set(null);
// 		return;
// 	}

// 	fetchDoc("users", firebaseUser.uid).then((doc: User | null) => {
// 		if (doc) currentUser.set(doc);
// 		else {
// 			const user: User = {
// 				uid: firebaseUser.uid,
// 				email: firebaseUser.email,
// 				name: firebaseUser.displayName,
// 				avatar: firebaseUser.photoURL || "",
// 				teams: [],
// 				locale: navigator?.language ?? "en-US",
// 				timezoneOffsetInMins: new Date().getTimezoneOffset() / 60,
// 			};
// 			createDoc("users", firebaseUser.uid, user).then();
// 			currentUser.set(user);
// 		}
// 	});
// });
