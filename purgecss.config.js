const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
    plugins: [
        purgecss({
            content: ['./**/*.html']
        })
    ],
    content: ['public/index.html'],
    css: ['public/style.css'],
    output: './public/style.css',
}