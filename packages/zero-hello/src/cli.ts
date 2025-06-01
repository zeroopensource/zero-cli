import {
  program,
  // InvalidArgumentError
} from 'commander'

program
  .name('zero hello')
  .description('Say hello')
  .option('--name <name>', 'Name to greet', 'world')
  .action(options => {
    console.log(`Hello, ${options.name}!`)
  })

export const cli = program

export const cli2 = () => {
  console.log('Hello from zero-hello CLI subcommand!')
}

export default cli
