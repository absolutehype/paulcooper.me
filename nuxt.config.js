export default {
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
                content: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
            },
            {
                name: 'theme-color',
                content: '#ffffff',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'The personal portfolio of Paul Cooper, a London based Front End Developer working at HP',
            },
            {
                name: 'og:type',
                content: 'website',
            },
            {
                name: 'supported-color-schemes',
                content: 'dark light',
            },
            {
                name: 'color-scheme',
                content: 'dark light',
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
        ],
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
        '@nuxtjs/sentry',
        '@nuxtjs/pwa',
        '@nuxtjs/svg-sprite',
        // Doc: https://github.com/nuxt/content
        // '@nuxt/content'
        '@nuxtjs/google-analytics'
    ],
    /*
     ** SVG Sprite module configuration
     ** See https://github.com/nuxt-community/svg-sprite-module
     */
    svgSprite: {
        input: '~/assets/svg/',
    },
    /*
     ** Analytics
     */
    googleAnalytics: {
        id: 'UA-10561535-1'
    },
    /*
     ** Sentry
     */
    sentry: {
        dsn: process.env.SENTRY_DSN,
        environment: process.env.VERCEL_ENV
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
            {
                code: 'fr',
                name: 'Français',
                iso: 'fr-FR',
                file: 'fr-FR.js',
            },
        ],
        lazy: true,
        seo: true,
        defaultLocale: 'en',
        langDir: 'lang/',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            onlyOnRoot: true,
        }
    },
    /*
     ** Build configuration
     */
    // build: {
    //     /*
    //      ** You can extend webpack config here
    //      */
    //     extend(config, ctx) { },
    // },
}
