import path from 'path'
import minimist from 'minimist'
import readlineSync from 'readline-sync'
import chalk from 'chalk'
import logger from './logger'

export default function getConfig({ commands, defaultCommand }) {

  const options = minimist(process.argv.slice(2))
  const args = options._

  // Log/prompt
  const log = logger({ verbose: !options.quiet })
  const yesno = readlineSync.keyInYN
  const question = readlineSync.question

  // Command
  let command = defaultCommand

  if (args[0]) {
    if (commands.indexOf(args[0]) < 0) {
      log.error(`Unknown command "${args[0]}"`)
      return process.exit(1)
    }
    command = args[0]
    args.shift()
  }

  // Paths
  const root = process.cwd()
  const relative = name => path.relative(root, name)

  const config = {
    root,
    relative,
    command, options, args,
    log, yesno, question,
    chalk,
    globalIgnore: ['!**/_*/**', '!**/.git/**', '!**/node_modules/**']
  }

  return config
}
