export const addImport = function addImport(tree, mod, name) {
  tree.children.unshift({
    type: 'import',
    value: `import { ${name} as ${name} } from '${mod}'`,
  })
  return `${name}`
}

export const addDefaultImport = function addImport(tree, mod, name) {
  tree.children.unshift({
    type: 'import',
    value: `import ${name} from '${mod}'`,
  })
  return `${name}`
}
