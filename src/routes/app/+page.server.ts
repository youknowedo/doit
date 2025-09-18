import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({parent}) => {
	const { boards } = await parent();
	redirect(302, `/app/${boards[0].id}/todo`);
};
