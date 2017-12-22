import fs from 'fs'
import p from 'path'
import renderMarkdown from './render'

function endsWith(str, search) {
  return str.indexOf(search, str.length - search.length) !== -1
}

export default ({ types: t }) => ({
  visitor: {
    ImportDeclaration: {
      exit: function(path, state) {
        const node = path.node

        if (!endsWith(node.source.value, '.md')) return
        const dir = p.dirname(p.resolve(state.file.opts.filename))
        const absolutePath = p.resolve(dir, node.source.value)
        const content = fs.readFileSync(absolutePath, "utf8")

        path.replaceWith(t.variableDeclaration('var', [
          t.variableDeclarator(
            t.identifier(node.specifiers[0].local.name),
            t.stringLiteral(
              renderMarkdown(content)
            )
          )
        ]))
      }
    }
  }
})
