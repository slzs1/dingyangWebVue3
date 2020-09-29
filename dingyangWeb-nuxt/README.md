# dingyang-nuxt

> Nuxt project for SEO

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

## 后端接口URL

本地进行项目开发时，进入server中开启node服务，端口号为3004，默认URL为`http://localhost:3004`，部署上线后可以将这个url换成真正的域名，在`plugins/config.js`文件中修改

```
cd server
npm install
npm run dev
```

## generate配置

- 解决没法在后端add接口中执行命令的同时调用其他函数接口

改为每次增加内容后记录在count.json文件中，并且自动进入Nuxt项目目录执行npm run generate，通过读取json数据遍历路由