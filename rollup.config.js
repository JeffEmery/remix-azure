import babel from '@rollup/plugin-babel'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'
import copy from 'rollup-plugin-copy'
import rimraf from 'rimraf'

let { name: packageName, version, author } = require(`./package.json`)
let outputDir = './lib'
let sourceDir = './src'

rimraf(outputDir, () => console.log(`deleting files from ${outputDir}`))

let banner = `/*
 * ${packageName} v${version}
 *
 * Copyright (c) ${new Date().getFullYear()} ${author}
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */`

function isBareModuleId(id) {
  return !id.startsWith('.') && !path.isAbsolute(id)
}

export default {
  external(id) {
    return isBareModuleId(id)
  },
  input: './src/index.ts',
  output: {
    format: 'cjs',
    dir: 'lib',
    preserveModules: true,
    exports: 'auto',
    banner,
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      exclude: /node_modules/,
      extensions: ['.ts', '.tsx'],
    }),
    nodeResolve({ extensions: ['.ts'] }),
    copy({
      targets: [
        { src: `LICENSE.md`, dest: outputDir },
        { src: `${sourceDir}/package.json`, dest: outputDir },
        { src: `${sourceDir}/README.md`, dest: outputDir },
      ],
    }),
  ],
}
