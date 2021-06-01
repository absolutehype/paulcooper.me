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
        title: 'Paul Cooper - Front End Developer',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                name: 'theme-color',
                content: '#333333',
            },
            {
                hid: 'description',
                name: 'description',
                content:
                    'The personal portfolio of Paul Cooper, a London based Front End Developer working at HP',
            },
            {
                name: 'og:type',
                content: 'website',
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }]
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
        '@nuxtjs/svg-sprite',
        // Doc: https://github.com/nuxt/content
        // '@nuxt/content'
    ],
    /*
     ** SVG Sprite module configuration
     ** See https://github.com/nuxt-community/svg-sprite-module
     */
    svgSprite: {
        input: '~/assets/svg/',
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
                file: 'en-US.js',
            },
            {
                code: 'es',
                name: 'Español',
                iso: 'es-ES',
                file: 'es-ES.js',
            },
        ],
        lazy: true,
        seo: true,
        defaultLocale: 'en',
        langDir: 'lang/',
    },
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {},
    },
}
