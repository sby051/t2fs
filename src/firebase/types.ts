import type { ID } from "@types";

export type FirestoreCollection<T> = { [key: ID]: T };