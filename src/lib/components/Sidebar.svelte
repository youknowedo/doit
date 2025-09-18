<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Sidebar from '$lib/components/ui/sidebar';
	import { ChevronsUpDown, PanelLeft, PlusIcon, SquareKanban } from '@lucide/svelte';
	import type { Board } from '@prisma/client';

	type SidebarItems = {
		title: string;
		items: {
			title: string;
			url: string;
			icon: typeof SquareKanban;
		}[];
	};

	type Props = {
		boards: Board[];
		currentBoard: Board;
		items: SidebarItems[];
		currentItem: string;
	};

	let { boards, currentBoard, items, currentItem }: Props = $props();

	let sidebar = Sidebar.useSidebar();
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								size="lg"
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<div
									class="flex justify-center items-center bg-sidebar-primary rounded-lg size-8 aspect-square text-sidebar-primary-foreground"
								>
									<SquareKanban class="size-4" />
								</div>
								<div class="flex-1 grid text-sm text-left leading-tight">
									<span class="font-medium truncate">
										{currentBoard.name}
									</span>
									<span class="text-xs truncate">{currentBoard.id}</span>
								</div>
								<ChevronsUpDown class="ml-auto" />
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content
						class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
						align="start"
						side={sidebar.isMobile ? 'bottom' : 'right'}
						sideOffset={4}
					>
						<DropdownMenu.Label class="text-muted-foreground text-xs">Teams</DropdownMenu.Label>
						{#each boards as board, index (board.id)}
							<DropdownMenu.Item onSelect={() => (currentBoard = board)} class="gap-2 p-2">
								<div class="flex justify-center items-center border rounded-md size-6">
									<SquareKanban class="size-3.5 shrink-0" />
								</div>
								{board.name}
								<DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
							</DropdownMenu.Item>
						{/each}
						<DropdownMenu.Separator />
						<DropdownMenu.Item class="gap-2 p-2">
							<div class="flex justify-center items-center bg-transparent border rounded-md size-6">
								<PlusIcon class="size-4" />
							</div>
							<div class="font-medium text-muted-foreground">Add board</div>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		{#each items as item}
			<Sidebar.Group>
				<Sidebar.GroupLabel>{item.title}</Sidebar.GroupLabel>

				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each item.items as subitem (subitem.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton isActive={subitem.url === currentItem}>
									{#snippet child({ props })}
										<a href={subitem.url} {...props}>
											<subitem.icon />
											<span>{subitem.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		{/each}
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton onclick={() => sidebar.toggle()}>
					<PanelLeft />
					<span>Toggle Sidebar</span>
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
