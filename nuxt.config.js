import path from 'path';

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global SCSS
  */
  styleResources: {
    scss: [
      '@/assets/scss/vars/index.scss',
      '@/assets/scss/mixins/index.scss',
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/scss/index.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
	{ src: '@/plugins/provide' },
	{ src: '@/plugins/nuxt-client-init', mode: 'client' },
	{ src: '@/plugins/modal/index', mode: 'client' },
	{ src: '@/plugins/modal-hash/index' },
	{ src: '@/plugins/animations/index', mode: 'client' },
],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
	'@nuxtjs/dotenv',
	'@nuxtjs/svg',
	'@nuxtjs/style-resources',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Server settings
  */
  server: {
    host: '0.0.0.0'
  },
  /*
  ** Server Middleware
  */
  serverMiddleware: [
    '@/api'
  ],
  /*
  ** Loading
  */
  // loading: '~/components/&organisms/Preloader.vue', // TODO: Uncomment
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
		// Packages alias - для vue-runtime-template
		config.resolve.alias['vue'] = 'vue/dist/vue.common';

		// Alias
		config.resolve.alias['&'] = path.join(__dirname, 'components/&organisms');
		config.resolve.alias['^'] = path.join(__dirname, 'components/^molecules');
		config.resolve.alias['+'] = path.join(__dirname, 'components/+atoms');
		config.resolve.alias['='] = path.join(__dirname, 'components/=libs');
    },
  }
}
