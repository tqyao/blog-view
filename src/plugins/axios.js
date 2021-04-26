import axios from "axios";
import NProgress from 'nprogress'
import store from '@/store'
import 'nprogress/nprogress.css'

import {getToken} from "@/plugins/token";


const service = axios.create({
    baseURL: 'http://localhost:8090/',
    timeout: 10000,
})

// service 拦截
service.interceptors.request.use(
    config => {
        NProgress.start()
        if (store.state.token) {
            config.headers['Authorization'] = getToken()
        }
        return config
    },
    error => {
        //把pending状态修改为拒绝返回
        return Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {

        const res = response.data;
        // 200 表示操作成功
        if (res.code !== 200) {
            // 操作不成功，根据后端状态码，判断错误类型作出相应操作操作

        } else {
            return res
        }
    },
    error => {
        this.$message({
            type: 'warning',
            showClose: true,
            message: '连接超时'
        })
        return Promise.reject('error')
    }
)

export default service
