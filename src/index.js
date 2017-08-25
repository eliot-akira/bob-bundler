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

try {
  require(`./commands/${command}`)(config)  
} catch (e) {
  console.error(e)
}
