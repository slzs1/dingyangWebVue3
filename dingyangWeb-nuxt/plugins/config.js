// let host = 'http://localhost:3004';
let host = 'http://47.94.168.183:3004';
import Vue from 'vue' // vue 文件引入 - 方便在vue方法内容直接 this 调取
  
let config = {
    install(Vue) {
        Vue.prototype.host= host; // 变量的内容 后期可以在vue中 this->$api.xxx 使用
    }
};
  
Vue.use(config); // 这里不能丢
  
// 这里是 为了在 asyncData 方法中使用
export default ({ app }, inject) => {
    // Set the function directly on the context.app object
    app.host = host // 名称
};