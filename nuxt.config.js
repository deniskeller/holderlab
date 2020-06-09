require('dotenv').config();

const title = 'Holderlab - Bitcoin Cryptocurrency Portfolio Management Tool';
const description = '';

module.exports = {
  mode: 'universal',
  // buildDir: '../dist', //onlyProduction
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: title,
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Holderlab rebalance your invest in bitcoin cryptocurrency portfolio with connected to cryptocurrency exchange: Binance, Coinbase Pro, Huobi, Bittrex, Kucoin'
      },
      {
        name: 'robots',
        content: 'index, follow'
      },
      
      
      {
        name: 'twitter: card',
        content: 'summary'
      },
      {
        name: 'twitter: title',
        content: 'Holderlab - Bitcoin Cryptocurrency Portfolio Management Tool'
      },
      {
        name: 'twitter: description',
        content: 'Holderlab manage Bitcoin cryptocurrency portfolio with rebalance and connects to cryptocurrency exchanges: Binance, Coinbase Pro, Huobi, Bittrex, Kucoin.'
      },
      {
        name: 'twitter:image',
        content: 'cdn.holderlab.io/holderlab_portfolio.png'
      },
      {
        name: 'twitter:creator',
        content: '@gotoholderlab'
      },
      {
        name: 'twitter:site',
        content: '@gotoholderlab'
      },
      {
        name: 'og:url',
        content: 'https://holderlab.io'
      },
      {
        name: 'og:type',
        content: 'website'
      },
      {
        name: 'og:title',
        content: 'Holderlab - Bitcoin Cryptocurrency Portfolio Management Tool'
      },
      {
        name: 'og:description',
        content: 'Holderlab manage Bitcoin cryptocurrency portfolio with rebalance and connects to cryptocurrency exchanges: Binance, Coinbase Pro, Huobi, Bittrex, Kucoin.'
      },
      {
        name: 'og:site_name',
        content: 'Holderlab'
      },
      {
        name: 'og:image',
        content: 'cdn.holderlab.io/holderlab_portfolio.png'
      },
      {
        property: 'og:url',
        content: 'https://holderlab.io'
      },
      {
        property: 'og:type',
        content: 'website'
      },
      {
        property: 'og:title',
        content: 'Holderlab - Bitcoin Cryptocurrency Portfolio Management Tool'
      },
      {
        property: 'og:description',
        content: 'Holderlab manage Bitcoin cryptocurrency portfolio with rebalance and connects to cryptocurrency exchanges: Binance, Coinbase Pro, Huobi, Bittrex, Kucoin.'
      },
      {
        property: 'og:site_name',
        content: 'Holderlab'
      },
      {
        property: 'og:image',
        content: 'cdn.holderlab.io/holderlab_portfolio.png'
      }
      
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#0F67F0'
  },
  router: {
    base: process.env.NUXT_ROOT
  },
  css: [
    { 
      src: '@/assets/scss/common.scss',
      lang: 'sass'
    },
    'swiper/dist/css/swiper.css'
  ],
  plugins: [
    {
      src: '~/plugins/global'
    },
    // { src: '~/plugins/axios'},
    { src: '~/plugins/fullpage', ssr: false },
    // { src: '~/plugins/vue-cookie', ssr: false, injectAs: 'cookie' },
    { src: '~/plugins/swiper.js', ssr: false },
    { src: '~/plugins/vue-datepicker', ssr: false },
    { src: '~/plugins/vue-apexcharts', ssr: false },
    { src: '~/plugins/vue-qrcode', ssr: false },
    { src: '~/plugins/vue-load-script', ssr: false },
    // { src: "~/plugins/aos", ssr: false },
  ],
  modules: [
    '@nuxtjs/style-resources',
    //'nuxt-sass-resources-loader',
    '@nuxtjs/axios',
    // 'nuxt-fullpage.js',
    '@nuxtjs/toast',
    // 'cookie-universal-nuxt',
    'vue-scrollto/nuxt',
    'nuxt-clipboard2',
    ['@nuxtjs/google-tag-manager', { id: 'GTM-PSFZ85N' }],
// =======
    
    // ['@nuxtjs/google-analytics', { id: 'UA-142715642-1' }],
    // '@nuxtjs/axios',
    // '@neneos/nuxt-animate.css'
// >>>>>>> origin/test
  ],
  toast: {
    position: 'top-center',
    // you can pass a single action as below
    action: {
      text: 'X',
      onClick: (e, toastObject) => {
        toastObject.goAway(0);
      }
    }
  },
  styleResources: {
    scss: ['./assets/scss/resources.scss']
  },
  // sassResources: [ '@/assets/scss/resources.scss' ],
  axios: {
    baseURL: `https://api.holderlab.io/api/`,
    credentials: true,
    withCredentials: true,
    
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    // }
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      /*if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          },
        });
      }*/
    }
  },
  vue: {
    config: {
      productionTip: false, // = !dev
      devtools: true // = dev
    }
  },
  // googleAnalytics: {
  // id: process.env.GOOGLE_ANALYTICS_ID,
  // debug: {
  //     enabled: false,
  //     sendHitTask: true
  //   }
  // },
};
