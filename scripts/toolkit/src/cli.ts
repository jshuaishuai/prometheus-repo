
import { cac } from 'cac';
import { defineCommand } from './commands';

async function bootstrap() {
    const CLI_NAME = 'toolkit';
    const cli = cac(CLI_NAME);
    await defineCommand(cli);
    cli.on('command:*', () => {
        process.exit(1);
    })
    cli.usage(CLI_NAME);
    // Display help message when `-h` or `--help` appears
    cli.help()
    // Display version number when `-v` or `--version` appears
    // It's also used in help message
    cli.version('0.0.0')
    cli.parse()

}
bootstrap().catch((error) => {
    console.log('Toolkit Error', error)
    process.exit(1);
})
