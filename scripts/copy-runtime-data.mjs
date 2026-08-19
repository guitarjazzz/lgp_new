import { cp, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const outputRoot = join(process.cwd(), '.output', 'runtime-data');

await mkdir(outputRoot, { recursive: true });
await cp(join(process.cwd(), 'projects'), join(outputRoot, 'projects'), { recursive: true });
await mkdir(join(outputRoot, 'app'), { recursive: true });
await cp(join(process.cwd(), 'app', 'base.conf'), join(outputRoot, 'app', 'base.conf'));
await cp(
	join(process.cwd(), 'app', 'templates', 'app'),
	join(outputRoot, 'app', 'templates', 'app'),
	{ recursive: true }
);