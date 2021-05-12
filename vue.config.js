const path = require('path')

function resolve(dir) {
    console.log(__dirname)
    return path.join(__dirname, dir)
}

module.exports = {
    // configureWebpack: {
    //     resolve: {
    //         alias: {
    //             'assets': '@/assets',
    //             'common': '@/common',
    //             'components': '@/components',
    //             'api': '@/api',
    //             'views': '@/views',
    //             'plugins': '@/plugins',
    //             'public': 'public'
    //         }
    //     },
    //     devtool: 'source-map',
    //
    // },
    chainWebpack: config => {
        config.resolve.alias
            // .set('@', resolve('/src'))
            .set('@/assets', resolve('@/assets'))
            .set('@/components', resolve('@/components'))
            .set('@/api', resolve('@/api'))
            .set('@/views', resolve('@/views'))
            .set('@/plugins', resolve('@/plugins'))
            .set('public', resolve('public'))


        // config.module
        //     .rule('less')
        //     .use('less-loader')
        //     .loader('less-loader')
        //     .options({
        //         lessOptions: {
        //             /**less-loader 配置 */
        //             strictMath: true,
        //             noIeCompat: true
        //         }
        //     })
    },


}