#!/usr/bin/env node
import {
  program,
  // InvalidArgumentError
} from 'commander'
import packagejson from '../package.json'
import { ZERO_OFFICIAL_LINKS } from '@zeroopensource/zero-official'

// TODO: Import from official repo
const officialLinks = {
  'All Official Links': 'https://github.com/zeroopensource/zero-official',
  GitHub: 'https://github.com/zeroopensource',
  Website: 'https://zeroopensource.org',
}

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
    for (const [label, url] of Object.entries(officialLinks)) {
      console.log(`  ${label}: ${url}`)
    }
    console.log()
  })

const noSubCommand = process.argv.length <= 2
if (noSubCommand) {
  program.help()
}
