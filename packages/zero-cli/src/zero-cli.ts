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

const builtinCommands = ['official', 'list', '--help', '-h', '--version', '-v']
const [, , potentialSubcommand, ...restArgs] = process.argv

;(async () => {
  if (
    potentialSubcommand &&
    !builtinCommands.includes(potentialSubcommand) &&
    !potentialSubcommand.startsWith('-')
  ) {
    // Handle dynamic subcommand: zero <subcommand>
    const moduleName = `@zeroopensource/zero-${potentialSubcommand}/cli`
    try {
      const mod = await import(moduleName)
      const subProgram = mod.default

      if (typeof subProgram?.parseAsync === 'function') {
        await subProgram.parseAsync(restArgs, { from: 'user' })
      } else {
        console.error(
          `❌ ${moduleName} does not export a Commander Command instance.`
        )
        process.exit(1)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`\n❌ Failed to run subcommand "${potentialSubcommand}"`)
      console.error(`→ Tried to load: ${moduleName}`)
      console.error(`→ Error: ${message}\n`)
      process.exit(1)
    }
  } else {
    await program.parseAsync(process.argv)
  }
})()

const noSubCommand = process.argv.length <= 2
if (noSubCommand) {
  program.help()
}
