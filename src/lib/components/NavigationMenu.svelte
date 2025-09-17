<script lang="ts">
	import { page } from '$app/state';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu';

	export type NavigationMenuItem = Link | Dropdown;

	type Link = {
		type: 'link';
		label: string;
		href: string;
	};

	type Dropdown = {
		type: 'dropdown';
		label: string;
		items: Link[];
	};

	type Props = {
		items: NavigationMenuItem[];
	};

	const { items }: Props = $props();
</script>

<NavigationMenu.Root>
	<NavigationMenu.List>
		{#each items as item}
			{#if item.type === 'link'}
				<NavigationMenu.Item>
					<NavigationMenu.Link
						class={{
							'bg-accent text-accent-foreground': page.url.pathname === item.href
						}}
						href={item.href}
					>
						{item.label}
					</NavigationMenu.Link>
				</NavigationMenu.Item>
			{:else if item.type === 'dropdown'}
				<NavigationMenu.Item>
					<NavigationMenu.Trigger>{item.label}</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						{#each item.items as subItem}
							<NavigationMenu.Link href={subItem.href}>
								{subItem.label}
							</NavigationMenu.Link>
						{/each}
					</NavigationMenu.Content>
				</NavigationMenu.Item>
			{/if}
		{/each}
	</NavigationMenu.List>
</NavigationMenu.Root>
