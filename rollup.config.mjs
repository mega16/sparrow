import resolve from "@rollup/plugin-node-resolve"; // 解析 node_modules 模块
import commonjs from "@rollup/plugin-commonjs"; // 转换 CommonJS 模块为 ES6
import babel from "@rollup/plugin-babel"; // 使用 Babel 转换代码
import terser from "@rollup/plugin-terser"; // 压缩代码
import del from "rollup-plugin-delete";

export default {
  input: "src/index.js", // 入口文件
  output: [
    {
      file: "lib/sparrow.cjs.js", // CommonJS 格式输出
      format: "cjs",
    },
    {
      file: "lib/sparrow.esm.js", // ES Module 格式输出
      format: "esm",
    },
    {
      file: "lib/sparrow.min.js", // 对于 Nodejs 和浏览器，打包成混合模式
      format: "umd",
      name: "sp", // 浏览器中全局变量名
      plugins: [terser()],
    },
  ],
  plugins: [
    del({
      targets: ["lib/*"], // 删除 lib 文件夹内容
      verbose: true, // 显示删除日志
      // runOnce: true, // 仅在首次运行时删除
    }),
    resolve(), // 解析 node_modules
    commonjs(), // 转换 CommonJS 模块
    babel({
      babelHelpers: "bundled", // 使用 Babel 自带 helpers
      exclude: "node_modules/**", // 排除 node_modules
    }),
  ],
};
