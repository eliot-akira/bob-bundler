import getConfig from './utils/getConfig'

const config = getConfig({
  commands: [
    'build',
    'clean',
    'dev',
    'help',
    // TODO: Document
    'list',
    'install',
    'uninstall',
    'git'
  ],
  defaultCommand: 'help'
})

const { command } = config

require(`./commands/${command}`)(config)