import { transformSync } from 'esbuild'

export function transformCode(options) {
    return transformSync(options.code, {
        loader: options.loader || 'js',
        sourcemap: true,
        format: 'esm'
    })
}

export function transformCss(options) {
    return `
        import { updateStyle } from '/@vite/client'
        const id = '${options.path}'
        const css = '${options.code.replace(/\n/g, '').replaceAll('\'', "")}'
        updateStyle(id, css)
    `.trim()
}