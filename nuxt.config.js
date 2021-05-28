export default {
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            },
            {
                name: 'theme-color',
                content: '#ffffff'
            },
            {
                name: 'apple-touch-icon',
                content: '~/static/apple-touch-icon.png'
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'Find your next Boat on Boatfront. The #1 marketplace for buying new and used Sail or Motor Boats.'
            },
            {
                name: 'og:image',
                content: '~/static/share.jpg'
            },
            {
                name: 'og:type',
                content: 'website'
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.svg' }
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: { color: '#fff' },
    /*
     ** Global CSS
     */
     css: ['assets/styles/index.scss'],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: ['~/plugins/i18n.js', '~/plugins/version.js'],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxt/http',
        'nuxt-i18n',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/svg-sprite'
        // Doc: https://github.com/nuxt/content
        // '@nuxt/content'
    ],
    /*
     ** SVG Sprite module configuration
     ** See https://github.com/nuxt-community/svg-sprite-module
     */
    svgSprite: {
        input: '~/assets/svg/'
    },
    /*
     ** Vue i18n configuration
     */
    i18n: {
        locales: [
            {
                code: 'en',
                name: 'English',
                iso: 'en-US',
                file: 'en-US.js'
            },
            {
                code: 'es',
                name: 'Español',
                iso: 'es-ES',
                file: 'es-ES.js'
            }
        ],
        lazy: true,
        seo: true,
        defaultLocale: 'en',
        langDir: 'lang/'
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {}
    }
}
