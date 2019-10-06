import {terser} from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript'

export default {
  external: [
    'redux'
  ],
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/json4typescript.js',
      format: 'cjs',
      globals: {
        redux: 'Redux'
      },
      name: 'dev'
    },
    {
      file: 'dist/json4typescript.min.js',
      format: 'cjs',
      globals: {
        redux: 'Redux'
      },
      name: 'min'
    }
  ],
  plugins: [
    typescript(),
    terser({
      include: [
        /^.+\.min\.js$/
      ]
    })
  ]
}
