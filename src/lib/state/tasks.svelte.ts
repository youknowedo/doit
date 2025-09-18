import type { prisma } from '$lib/server/prisma';
import { writable } from 'svelte/store';
import type { load } from '../../routes/app/[boardId]/+layout.server';

export type CreateTask = Parameters<typeof prisma.task.create>[0]['data'];
export type Task = Awaited<ReturnType<typeof load>>['board']['tasks'][number];

export const tasks = {
	...writable<Task[]>([]),
	add: (task: CreateTask) => {
		tasks.update((ts) => [...ts, task as Task]);
	}
};
