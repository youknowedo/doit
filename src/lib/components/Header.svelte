<script lang="ts">
	import { SignOut } from '@auth/sveltekit/components';
	import NavigationMenu from './NavigationMenu.svelte';
	import { Button } from './ui/button';
</script>

<div class="border-b">
	<div class="items-center gap-4 grid grid-cols-[1fr_auto_1fr] mx-auto py-4 container">
		<div></div>

		<div>
			<NavigationMenu
				items={[
					{
						type: 'link',
						label: 'Home',
						href: '/app'
					},
					{
						type: 'link',
						label: 'Tasks',
						href: '/app/tasks'
					},
					{
						type: 'link',
						label: 'Week',
						href: '/app/week'
					},
					{
						type: 'link',
						label: 'Calendar',
						href: '/app/calendar'
					}
				]}
			/>
		</div>

		<div class="flex justify-end">
			<SignOut>
				<div class="flex" slot="submitButton">
					<Button variant="destructive">Sign Out</Button>
				</div>
			</SignOut>
		</div>
	</div>
</div>
