import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import { prisma } from './prisma';

export const { handle } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: []
});
