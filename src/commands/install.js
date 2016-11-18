import chalk from 'chalk'
import { spawnSync } from 'child_process'
import getBundles from '../utils/getBundles'
import getPackageJSON from '../utils/getPackageJSON'

module.exports = function install(config) {

  const { root, options, log, relative, yesno, question, uninstall = false } = config

  const bundles = getBundles(config)
  const rootPackage = getPackageJSON(root)
  const { dependencies = {}, devDependencies = {} } = rootPackage
  const installChoices = []

  log.title(uninstall ? 'Uninstall' : 'Install')

  bundles.forEach(b => {

    // Ignore root bundle
    if (!relative(b.root)) return

    const bundle = b.json
    const modules = []
    const devModules = []

    // ------------ Dependencies ------------
    if (!options.dev) {
      let deps = bundle.dependencies || {}
      if (!uninstall && bundle.peerDependencies) {
        deps = { ...deps, ...bundle.peerDependencies }
      }
      Object.keys(deps).forEach(dep => {

        if ((uninstall && !dependencies[dep])
          || (!uninstall && dependencies[dep])
        ) return

        modules.push(dep)
      })
    }

    // ------------ Dev dependencies ------------
    if (options.all || options.dev) {
      Object.keys(bundle.devDependencies).forEach(dep => {

        if ((uninstall && !devDependencies[dep])
          || (!uninstall && devDependencies[dep])
        ) return

        devModules.push(dep)
      })
    }

    if (!modules.length && !devModules.length) return

    installChoices.push( {
      title: relative(b.root),
      modules, devModules
    })
  })

  if (!installChoices.length) {
    return log.info(uninstall ? 'Nothing to uninstall' : 'Everything is installed')
  }


  installChoices.forEach(({ title, modules, devModules }, index) => {

    log.info(`[${ chalk.green(index+1) }] ${title}`)

    modules.forEach(module => log(`  ${module}`))

    if (devModules.length) {
      log.info('  dev:')
      devModules.forEach(c => log(c))
      devModules.forEach(module => log(`  ${module}`))
    }
  })

  log.info(`\n[${ chalk.green("0") }] All, [${ chalk.green("Enter") }] Cancel, Multiple: 1,2,3\n`)

  const answer = question(`Select modules to ${uninstall ? 'uninstall' : 'install'}: `)
    .split(',').map(ans => (ans!=='' && !isNaN(ans)) ? parseInt(ans) : ans)

  let allModules = [], allDevModules = []

  answer.forEach(ans => {

    if (ans==='') return

    let pushModules = [], pushDevModules = []

    // All
    if (ans===0) {
      installChoices.forEach(({ modules, devModules }) => {
        pushModules.push(...modules)
        pushDevModules.push(...devModules)
      })
    // Selected
    } else if (installChoices[ans - 1]) {
      const { modules, devModules } = installChoices[ans - 1]
      pushModules.push(...modules)
      pushDevModules.push(...devModules)
    }

    pushModules.forEach(m => {
      if (allModules.indexOf(m)>=0) return
      allModules.push(m)
    })
    pushDevModules.forEach(m => {
      if (allDevModules.indexOf(m)>=0) return
      allDevModules.push(m)
    })
  })

  if (allModules.length) {
    const args = [
      uninstall ? 'uninstall' : 'install',
      '--save',
      ...allModules
    ]
    log.info('\nnpm '+args.join(' '))
    spawnSync('npm', args, { stdio: 'inherit' })
  }

  if (allDevModules.length) {
    const args = [
      uninstall ? 'uninstall' : 'install',
      '--save-dev',
      ...allDevModules
    ]
    log.info('\nnpm '+args.join(' '))
    spawnSync('npm', args, { stdio: 'inherit' })
  }
}
