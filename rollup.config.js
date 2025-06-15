import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/app.ts',
  output: {
    file: 'dist/app.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' }),
    // 生产环境使用压缩插件
    process.env.NODE_ENV === 'production' && terser(),
  ],
  external: ['koa', 'koa-router', 'koa-bodyparser'], // 排除外部依赖
};