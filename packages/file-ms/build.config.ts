import { defineBuildConfig} from 'unbuild'

export default defineBuildConfig({
    entries: [
        "src/index.ts"
    ],
    outDir: "dist",
    clean: true, // 是否清除 dist 目录
    declaration: true, // 是否生成 .d.ts 文件
    externals: [],
    rollup: {
        emitCJS: true,
    },
});
