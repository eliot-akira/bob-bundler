import install from './install'

export default function uninstall(config) {
  return install({ ...config, uninstall: true })
}