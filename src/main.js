import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//自定义css
import './assets/css/base.css'
//阿里icon
import './assets/css/icon/iconfont.css'
//typo.css
import "./assets/css/typo.css";

import installElementPlus from './plugins/element'


const app = createApp(App)
installElementPlus(app)
app.use(store).use(router).mount('#app')
