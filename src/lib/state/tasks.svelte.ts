import { writable } from 'svelte/store';

export type Task = {
	id?: string;
	name: string;
	completed: boolean;
	date?: Date;
	endDate?: Date;
	priority?: 'low' | 'medium' | 'high';
};

export const tasks = writable<Task[]>([]);
