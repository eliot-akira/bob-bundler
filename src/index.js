import getConfig from './utils/getConfig'

const config = getConfig({
  commands: [
    'build',
    'clean',
    'dev',
    'list',
    'install',
    'uninstall'
  ],
  defaultCommand: 'list'
})

const { command } = config

require(`./commands/${command}`)(config)