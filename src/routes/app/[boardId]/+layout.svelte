<script lang="ts">
	import { page } from '$app/state';
	import AppSidebar from '$lib/components/Sidebar.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { Calendar, Kanban, ListCheck } from '@lucide/svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
	let { boards, board } = data;
</script>

<Sidebar.Provider>
	<AppSidebar
		{boards}
		currentBoard={boards.find((b) => b.id === board.id)!}
		items={[
			{
				title: 'Views',
				items: [
					{ title: 'Todo', url: `/app/${board.id}/todo`, icon: ListCheck },
					{ title: 'Kanban', url: `/app/${board.id}/kanban`, icon: Kanban },
					{ title: 'Calendar', url: `/app/${board.id}/calendar`, icon: Calendar }
				]
			},
		]}
		currentItem={page.url.pathname}
	/>
	<main>
		{@render children?.()}
	</main>
</Sidebar.Provider>
