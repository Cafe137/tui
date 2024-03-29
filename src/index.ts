#!/usr/bin/env node

import { createParser } from 'cafe-args'
import { Types } from 'cafe-utility'
import { exit } from 'process'
import { registerApiMonitorCommand } from './commands/api-monitor'
import { registerAwaitPortCommand } from './commands/await-port'
import { registerBeeCommand } from './commands/bee'
import { registerExpandCommand } from './commands/expand'
import { registerFakeBeeCommand } from './commands/fake-bee'
import { registerFakeBeeControllerCommand } from './commands/fake-bee-controller'
import { registerFunderCommands } from './commands/funder'
import { registerGetUnzipCommand } from './commands/get-unzip'
import { registerHabiticaCommands } from './commands/habitica'
import { registerJestCommand } from './commands/jest'
import { registerMonkeyPatchCommand } from './commands/monkey-patch'
import { registerNetworkCommand } from './commands/network'
import { registerProjectCommand } from './commands/project'
import { registerProxyCommand } from './commands/proxy'
import { registerProxyCliCommand } from './commands/proxy-cli'
import { registerSecureCommands } from './commands/secure'
import { registerWatchCommand } from './commands/watch'

async function main() {
    const parser = createParser({
        application: {
            name: 'Cafe TUI',
            description: 'Dev productivity things and stuff',
            version: 'alpha',
            command: 'cafe-tui'
        }
    })
    registerBeeCommand(parser)
    registerJestCommand(parser)
    registerProxyCommand(parser)
    registerWatchCommand(parser)
    registerExpandCommand(parser)
    registerFakeBeeCommand(parser)
    registerFunderCommands(parser)
    registerNetworkCommand(parser)
    registerProjectCommand(parser)
    registerSecureCommands(parser)
    registerGetUnzipCommand(parser)
    registerProxyCliCommand(parser)
    registerAwaitPortCommand(parser)
    registerHabiticaCommands(parser)
    registerApiMonitorCommand(parser)
    registerMonkeyPatchCommand(parser)
    registerFakeBeeControllerCommand(parser)
    const result = await parser.parse(process.argv.slice(2))
    if (Types.isString(result)) {
        console.error(result)
        exit(1)
    }
    if (Types.isFunction(result.command.fn)) {
        await result.command.fn(result).catch(x => {
            console.error(x.message)
            exit(1)
        })
    }
}

main()
