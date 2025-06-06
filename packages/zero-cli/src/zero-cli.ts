#!/usr/bin/env node
import {
  program,
  // InvalidArgumentError
} from 'commander'
import packagejson from '../package.json'
import { ZERO_OFFICIAL_LINKS } from '@zeroopensource/zero-official'

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

const noSubCommand = process.argv.length <= 2
if (noSubCommand) {
  program.help()
}
