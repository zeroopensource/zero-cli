#!/usr/bin/env node

import {
  program,
  // InvalidArgumentError
} from 'commander'
import packagejson from '../package.json'

// const commanderParseInt = (value: string) => {
//   const parsedValue = parseInt(value, 10)
//   if (isNaN(parsedValue)) {
//     throw new InvalidArgumentError('not a number')
//   }
//   return parsedValue
// }

// TODO: Import from official repo
const officialLinks = {
  Website: 'https://zeroopensource.org',
  GitHub: 'https://github.com/zeroopensource',
  Twitter: 'https://twitter.com/zeroopensource',
  Discord: 'https://discord.gg/zeroopensource',
}

program
  .name(Object.keys(packagejson.bin)[0] || 'undefined')
  .version(packagejson.version || 'undefined', '--version')
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

program.parse(process.argv)

const noSubCommand = process.argv.length <= 2
if (noSubCommand) {
  program.help()
}
