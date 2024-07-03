

import { type CAC } from 'cac';
import { defineCleanCommand } from './clean/index.js';

export async function defineCommand(cac: CAC) {

    await Promise.all([
        defineCleanCommand(cac)
    ])
}
