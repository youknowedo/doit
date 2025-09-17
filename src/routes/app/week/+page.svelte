<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { tasks, type Task } from '$lib/state/tasks.svelte';
	import { Trash2 } from '@lucide/svelte';

	import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';

	const DAYS_OF_WEEK = [
		'monday',
		'tuesday',
		'wednesday',
		'thursday',
		'friday',
		'saturday',
		'sunday'
	] as const;

	const DATES_OF_WEEK = DAYS_OF_WEEK.map((day) => {
		const date = new Date();
		const diff = DAYS_OF_WEEK.findIndex((d) => d === day) - date.getDay() + 1;
		date.setDate(date.getDate() + diff);
		date.setUTCHours(0, 0, 0, 0);
		return date;
	});

	function handleDrop(state: DragDropState<{ id: string }>) {
		const { draggedItem, sourceContainer, targetContainer } = state;
		if (!targetContainer || targetContainer === sourceContainer) return;

		if (targetContainer === 'unordered') {
			tasks.update((current) =>
				current.map((task) => (task.id === draggedItem.id ? { ...task, date: undefined } : task))
			);
			return;
		}

		const date = DATES_OF_WEEK[DAYS_OF_WEEK.findIndex((d) => d === targetContainer)];
		if (!date) return;

		tasks.update((current) =>
			current.map((task) => (task.id === draggedItem.id ? { ...task, date } : task))
		);
	}

	let newTaskName: { [k in (typeof DAYS_OF_WEEK)[number] | 'unordered']: string } = {
		unordered: '',
		monday: '',
		tuesday: '',
		wednesday: '',
		thursday: '',
		friday: '',
		saturday: '',
		sunday: ''
	};
</script>

{#snippet row(task: Task, container: (typeof DAYS_OF_WEEK)[number] | 'unordered')}
	<Table.Row class="flex items-stretch h-full">
		<div
			class="flex flex-grow items-stretch"
			use:draggable={{
				container: container,
				dragData: { id: task.id },
				callbacks: { onDragStart: () => console.log('Dragging:', task.name) }
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
		use:droppable={{ container: 'unordered', callbacks: { onDrop: handleDrop } }}
	>
		<Table.Root>
			<Table.Body>
				{#each $tasks.filter((task) => !task.date) as task}
					{@render row(task, 'unordered')}
				{/each}

				<Table.Row>
					<Table.Cell colspan={3}>
						<form class="flex gap-2">
							<Input bind:value={newTaskName.unordered} autofocus placeholder="New task name" />
							<Button
								type="submit"
								onclick={() => {
									if (newTaskName) {
										tasks.update((current) => [
											...current,
											{ id: newTaskName.unordered, name: newTaskName.unordered, completed: false }
										]);
										newTaskName.unordered = '';
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

	<div class="flex gap-4 col-span-2 overflow-x-scroll">
		{#each DAYS_OF_WEEK as day}
			<div
				class="border rounded-lg min-w-64"
				use:droppable={{ container: day, callbacks: { onDrop: handleDrop } }}
			>
				<h3 class="font-bold">{day}</h3>

				<Table.Root>
					<Table.Body>
						{#each $tasks.filter((task) => task.date?.valueOf() === DATES_OF_WEEK[DAYS_OF_WEEK.findIndex((d) => d === day)].valueOf()) as task}
							{@render row(task, day)}
						{/each}

						<Table.Row>
							<Table.Cell colspan={3}>
								<form class="flex gap-2">
									<Input bind:value={newTaskName[day]} autofocus placeholder="New task name" />
									<Button
										type="submit"
										onclick={() => {
											if (newTaskName) {
												tasks.update((current) => [
													...current,
													{
														id: newTaskName[day],
														name: newTaskName[day],
														completed: false,
														date: DATES_OF_WEEK[DAYS_OF_WEEK.findIndex((d) => d === day)]
													}
												]);
												newTaskName[day] = '';
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
		{/each}
	</div>
</div>

{JSON.stringify($tasks)}
