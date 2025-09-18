<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { tasks, type Task } from '$lib/state/tasks.svelte';
	import { Trash2 } from '@lucide/svelte';
	import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';
	import type { PageProps } from './$types';

	function handleDrop(state: DragDropState<{ id: string }>) {
		const { draggedItem, sourceContainer, targetContainer } = state;
		if (!targetContainer || targetContainer === sourceContainer) return;

		if (targetContainer === 'day') {
			tasks.update((current) =>
				current.map((task) => (task.id === draggedItem.id ? { ...task, date: currentDate } : task))
			);
			return;
		}

		const [hour, minute] = targetContainer.split(':').map(Number);
		const date = new Date(currentDate);
		date.setHours(hour, minute, 0, 0);
		tasks.update((current) =>
			current.map((task) => (task.id === draggedItem.id ? { ...task, date } : task))
		);
	}

	let currentDate = $state(new Date());
	currentDate.setUTCHours(0, 0, 0, 0);

	let newTaskName = $state('');

	const { data }: PageProps = $props();
	const { board } = data;
</script>

{#snippet row(task: Task, container: string)}
	<Table.Row class="flex items-stretch h-full">
		<div
			class="flex flex-grow items-stretch"
			use:draggable={{
				container,
				dragData: { id: task.id }
			}}
		>
			<Table.Cell class="flex items-center">
				<Checkbox bind:checked={task.completed} />
			</Table.Cell>
			<Table.Cell class="flex flex-grow items-center">
				{task.name}
			</Table.Cell>
		</div>
		<Table.Cell class="flex justify-end items-center">
			<Button
				variant="ghost"
				class="hover:text-destructive"
				onclick={() => {
					tasks.update((current) => current.filter((t) => t.id !== task.id));
					console.log($tasks);
				}}
			>
				<Trash2 />
			</Button>
		</Table.Cell>
	</Table.Row>
{/snippet}

<div class="grid grid-cols-3 mx-auto container">
	<div
		class="border rounded-lg"
		use:droppable={{ container: 'day', callbacks: { onDrop: handleDrop } }}
	>
		<Table.Root>
			<Table.Body>
				{#each $tasks.filter((task) => task.date?.valueOf() === currentDate.valueOf()) as task}
					{@render row(task, 'day')}
				{/each}

				<Table.Row>
					<Table.Cell colspan={3}>
						<form class="flex gap-2">
							<Input bind:value={newTaskName} autofocus placeholder="New task name" />
							<Button
								type="submit"
								onclick={() => {
									if (newTaskName) {
										tasks.update((current) => [
											...current,
											{
												id: newTaskName,
												name: newTaskName,
												completed: false,
												date: currentDate,
												hasTime: false,
												boardId: board.id,
												createdAt: new Date(),
												priority: 'LOW',
												endDate: null
											}
										]);
										newTaskName = '';
									}
								}}
							>
								Add Task
							</Button>
						</form>
					</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.Root>
	</div>

	<div class="col-span-2">
		{#each Array.from({ length: 24 * 4 }, (_, i) => {
			const hour = Math.floor(i / 4);
			const minute = (i % 4) * 15;
			return { hour, minute };
		}) as slot}
			<div
				class="px-2 py-1 border-b min-h-[40px]"
				use:droppable={{
					container: `${slot.hour}:${slot.minute}`,
					callbacks: { onDrop: handleDrop }
				}}
			>
				<span class="text-gray-500 text-xs"
					>{slot.hour.toString().padStart(2, '0')}:{slot.minute.toString().padStart(2, '0')}</span
				>
				{#each $tasks.filter((task) => {
					const date = task.date && new Date(task.date);
					return date && date.getUTCHours() === slot.hour && date.getUTCMinutes() === slot.minute;
				}) as task}
					{@render row(task, `${slot.hour}:${slot.minute}`)}
				{/each}
			</div>
		{/each}
	</div>
</div>
