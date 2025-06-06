#!/usr/bin/env node
import {
  program,
  // InvalidArgumentError
} from 'commander'
import packagejson from '../package.json'
import { ZERO_OFFICIAL_LINKS } from '@zeroopensource/zero-official'
import { generateZeroId } from '@zeroopensource/zero-id'
import { commanderParseInt } from './commander-parse-int'

program
  .name(Object.keys(packagejson.bin)[0] || 'zero')
  .version(packagejson.version || '0.0.0', '-v, --version')
  .description(
    `${packagejson.name}@${packagejson.version}: ${packagejson.description}`
  )

program
  .command('official')
  .description('Show official links for Zero Open Source')
  .action(() => {
    console.log('\nOfficial Links:\n')
    for (const [_key, value] of Object.entries(ZERO_OFFICIAL_LINKS)) {
      console.log(`  ${value.name}: ${value.url}`)
    }
    console.log()
  })

program
  .command('id')
  .description('output random hexadecimal id')
  .option(
    '--hexLength <value>',
    'limit length of each hex (default: 6)',
    commanderParseInt
  )
  .option(
    '--hexNum <value>',
    'specify number of hexes (default: 6)',
    commanderParseInt
  )
  .option('--prefix <value>', 'add prefix')
  .option('--suffix <value>', 'add suffix')
  .option('--divider <value>', `change divider (default: '-')`)
  .action(options => {
    console.log(generateZeroId({ prefix: 'zero1', ...options }))
  })

program.parse(process.argv)

const noSubCommand = process.argv.length <= 2
if (noSubCommand) {
  program.help()
}
