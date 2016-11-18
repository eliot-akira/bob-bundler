import chalk from 'chalk'

export default function createLogger(options) {

  let log = (name, ...args) => {
    console.log(chalk.blue(name), ...args)
  }

  log.title = (name, ...args) => {
    console.log(chalk.green(name)+(args[0] ? ':' : ''), ...args)
  }

  log.info = (...args) => {
    options.verbose && console.log(...args)
  }

  log.error = (name, ...args) => {
    console.error(chalk.red(name))
    if (args.length) console.log(...args)
  }

  return log
}
