import { prisma } from '$lib/server/prisma';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoadEvent } from './$types';

export const load = async ({ parent }: LayoutServerLoadEvent) => {
	const { session } = await parent();

	if (!session?.user?.id) {
		throw redirect(302, '/login');
	}

	const boards = await prisma.board.findMany({
		where: {
			userId: session.user.id
		}
	});

	if (boards.length === 0) {
		const board = await prisma.board.create({
			data: {
				name: 'My Board',
				userId: session.user.id
			}
		});

		throw redirect(302, `/app/${board.id}`);
	}

	return { boards };
};
