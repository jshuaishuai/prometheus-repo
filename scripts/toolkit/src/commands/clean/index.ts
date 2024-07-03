import type { CAC } from 'cac';
import { getPackages } from '@manypkg/get-packages';
import { join } from 'node:path';
import { rimraf } from 'rimraf';

const CLEAN_DIRS = ['dist', 'node_modules', '.turbo'];


interface RecursiveParams { recursive: boolean }
export async function defineCleanCommand(cac: CAC) {
    cac.command('clean [...dirs]')
        .usage(`删除项目下全部的 ['dist', 'node_modules', '.turbo'] 目录`)
        .option(`-r, --recursive`, `clean up all packages in the monorepo.`, {
            default: true,
        })
        .action(async (dirs, options: RecursiveParams) => {
            const _dirs = !dirs || dirs.length === 0 ? CLEAN_DIRS : dirs;
            await clean(_dirs, options);


        })
}


async function clean(dirs: string[], { recursive }: RecursiveParams) {
    const root = process.cwd();
    const { packages } = await getPackages(root);
    if (recursive) {
        await Promise.all(
            packages.map((pkg) => {
                const pkgRoot = dirs.map((item) => join(pkg.dir, item));
                return rimraf(pkgRoot, { preserveRoot: true })
            })
        )
    }

    await Promise.all(
        dirs.map((dir) => rimraf(join(root, dir), { preserveRoot: true }))
    )
}
