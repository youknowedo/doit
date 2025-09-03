import { PrismaAdapter } from '@auth/prisma-adapter';
import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import { prisma } from './prisma';

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [GitHub],
	session: {
		strategy: 'database'
	},
	callbacks: {
		async session({ session }) {
			return session;
		}
	}
});
