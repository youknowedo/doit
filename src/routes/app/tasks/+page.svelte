<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import { tasks } from '$lib/state/tasks.svelte';
	import { Trash2 } from '@lucide/svelte';

	let newTaskName = $state('');
</script>

<div class="mx-auto container">
	<div
		class="border rounded-lg"
	>
		<Table.Root>
			<Table.Body>
				{#each $tasks as task}
						<Table.Row>
							<Table.Cell class="w-0">
								<Checkbox bind:checked={task.completed} />
							</Table.Cell>
							<Table.Cell>
								{task.name}
							</Table.Cell>
							<Table.Cell class="flex justify-end">
								<Button
									variant="ghost"
									class="hover:text-destructive"
									onclick={() => {
										tasks.update((current) => current.filter((t) => t !== task));
									}}
								>
									<Trash2 />
								</Button>
							</Table.Cell>
						</Table.Row>
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
											{ id: newTaskName,  name: newTaskName, completed: false }
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
</div>

