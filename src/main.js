import './plugins/axios'
import {createApp} from 'vue'
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
import {ElMessage} from "element-plus";


const app = createApp(App)
installElementPlus(app)
app
    .use(store)
    .use(router)
    .use(installElementPlus)
    .mount('#app')

app.config.globalProperties.$msgSuccess = (msg) => {
    ElMessage({
        type: 'success',
        message: msg,
        showClose: 'true'
    })
}

app.config.globalProperties.$msgError = (msg) => {
    ElMessage({
        type: 'error',
        message: msg,
        showClose: 'true'
    })
}

app.config.globalProperties.$msgWarning = (msg) => {
    ElMessage({
        type: 'warning',
        message: msg,
        showClose: 'true'
    })
}

