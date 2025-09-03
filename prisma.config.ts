import path from 'node:path';
import { defineConfig } from 'prisma/config';

export default defineConfig({
	schema: path.join('prisma', 'schemas'),
	migrations: {
		path: path.join('prisma', 'migrations')
	}
});
