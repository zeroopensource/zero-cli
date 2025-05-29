#!/usr/bin/env node
import { readdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { createRequire } from 'module'
import {
  program,
  // InvalidArgumentError
} from 'commander'
import packagejson from '../package.json'

const require = createRequire(__filename)
const root = dirname(require.resolve('@zeroopensource/zero-cli/package.json'))
const nodeModulesRoot = join(
  root,
  '..',
  '..',
  'node_modules',
  '@zeroopensource'
)

// TODO: Import from official repo
const officialLinks = {
  'All Official Links': 'https://github.com/zeroopensource/zero-official',
  GitHub: 'https://github.com/zeroopensource',
  Website: 'https://zeroopensource.org',
}

program
  .name(Object.keys(packagejson.bin)[0] || 'zero')
  .version(packagejson.version || '0.0.0', '--version')
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

program
  .command('list')
  .description('List installed Zero subcommands')
  .action(async () => {
    try {
      const packages = await readdir(nodeModulesRoot, { withFileTypes: true })
      const zeroPackages = packages
        .filter(
          d =>
            (d.isDirectory() || d.isSymbolicLink()) &&
            d.name.startsWith('zero-') &&
            d.name !== 'zero-cli'
        )
        .map(d => ({
          name: d.name.replace('zero-', ''),
          full: `@zeroopensource/${d.name}`,
        }))

      if (zeroPackages.length === 0) {
        console.log('No other Zero subcommands installed.')
      } else {
        console.log('Available Zero subcommands:\n')
        for (const pkg of zeroPackages) {
          console.log(`  ${pkg.name.padEnd(12)} ${pkg.full}`)
        }
        console.log()
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error('Failed to list installed Zero subcommands:', message)
      process.exit(1)
    }
  })

// Catch all dynamic subcommands (e.g. "zero id", "zero tags", etc.)
program
  .command('*', { hidden: true }) // catch unknown commands
  .description(
    'Run subcommand from corresponding @zeroopensource/zero-* package'
  )
  .action(
    async (
      subcommand
      // cmdArgs
    ) => {
      try {
        const moduleName = `@zeroopensource/zero-${subcommand}/cli`
        const mod = await import(moduleName)
        if (typeof mod.default === 'function') {
          await mod.default(process.argv.slice(3)) // pass args to subcommand
        } else {
          console.error(
            `Error: ${moduleName} does not export a default function.`
          )
          process.exit(1)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.error(`\n❌ Failed to run subcommand "${subcommand}"\n`)
        console.error(`→ Tried to load: @zeroopensource/zero-${subcommand}/cli`)
        console.error(`→ Error: ${message}\n`)
        process.exit(1)
      }
    }
  )

program.parseAsync(process.argv)

const noSubCommand = process.argv.length <= 2
if (noSubCommand) {
  program.help()
}
