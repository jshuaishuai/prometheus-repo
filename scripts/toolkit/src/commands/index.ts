

import { type CAC } from 'cac';
import { defineCleanCommand } from './clean';

export async function defineCommand(cac: CAC) {

    await Promise.all([
        defineCleanCommand(cac)
    ])
}
