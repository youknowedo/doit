import { signIn } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent }) => {
	const { session } = await parent();

	if (session?.user?.id) throw redirect(302, '/app');
};

export const actions: Actions = { default: signIn };
