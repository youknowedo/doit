import { handle as authHandler } from '$lib/server/auth';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(authHandler);
