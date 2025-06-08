import { writable } from "svelte/store";

export const userState = $state({
	name: 'dorong',
	age: 20
});

export const countStore = writable(0);
