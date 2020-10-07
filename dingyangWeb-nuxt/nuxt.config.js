const axios = require('axios')
const fs = require('fs')
const path = require('path')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  server: {
  port: 4000, // default: 3000
  host: '0.0.0.0', // default: localhost
  },
  head: {
    title: '丁洋',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: '丁洋个人网站', name: '丁洋', content: '私募基金，私募总冠军，基金管理，博弈理论，实战手筋-操盘黑客理论，短线手筋-股市黑客理论' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo.ico' }
    ],
    script: [
      { src: '/lib/jquery.min.js' },
      { src: '/lib/bootstrap/js/bootstrap.min.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '@plugins/config', ssr: true}
  ],
  /*
  ** Global CSS
  */
  css: [
    '@assets/reset.css',
    '@static/lib/bootstrap/css/bootstrap.min.css'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  generate: {
    routes: function (callback) {
      fs.readFile(path.join(__dirname, '/count.json'), function (err, data) {
        if (err) {
          console.log(err)
        }
        let jsonData = data.toString()
        jsonData = JSON.parse(jsonData)
        const routes = jsonData.map((item) => {
          if (item.type === 'article') {
            return '/article/' + item.category + '/' + item.id
          }
          else {
            return '/video/' + item.id
          }
        })
        callback(null, routes)
      })
    }
  }
}
