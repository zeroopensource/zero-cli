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

program
  .name(Object.keys(packagejson.bin)[0] || 'undefined')
  .version(packagejson.version || 'undefined', '--version')
  .description(
    `${packagejson.name}@${packagejson.version}: ${packagejson.description}`
  )

program.parse(process.argv)
