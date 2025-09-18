<script lang="ts">
	import { SignOut } from '@auth/sveltekit/components';
	import NavigationMenu from './NavigationMenu.svelte';
	import { Button, buttonVariants } from './ui/button';
</script>

<div class="mb-8 border-b">
	<div class="items-center gap-4 grid grid-cols-[1fr_auto_1fr] mx-auto py-4 container">
		<div>doit</div>

		<div>
			<NavigationMenu
				items={[
					{
						type: 'link',
						label: 'Tasks',
						href: 'tasks'
					},
					{
						type: 'link',
						label: 'Week',
						href: 'week'
					},
					{
						type: 'link',
						label: 'Calendar',
						href: 'calendar'
					}
				]}
			/>
		</div>

		<div class="flex justify-end">
			<SignOut>
				<div class="flex" slot="submitButton">
					<div class={[buttonVariants({ variant: 'destructive' }), 'hover:cursor-pointer']}>
						Sign Out
					</div>
				</div>
			</SignOut>
		</div>
	</div>
</div>
