import axios from "axios";
import NProgress from 'nprogress'
import store from '@/store'
import 'nprogress/nprogress.css'

import {getToken} from "@/plugins/token";

const service = axios.create({
    baseURL: 'http://localhost:8082/',
    timeout: 10000,
})

// service 拦截
service.interceptors.request.use(
    config => {
        NProgress.start()
        if (store.state.token) {
            config.headers['Authorization'] = getToken().accessToken
        }
        return config
    },
    error => {
        //把pending状态修改为拒绝返回
        return Promise.reject(error)
    }
)


// //刷新请求刷新token接口方法
// function refreshToken() {
//     const {accessToken, refreshToken} = this.$store.token
//     // service是当前request.js中已创建的axios实例
//     return service.get(`/members/refresh-token/${accessToken}/${refreshToken}`).then(res => res.data)
// }

// 是否正在刷新的标记
let isRefreshing = false
// 重试队列，每一项将是一个待执行的函数形式
let requests = []


// response 拦截器
service.interceptors.response.use(
    response => {

        NProgress.done()

        const res = response.data;
        // 200 表示操作成功
        const code = res.code
        if (code !== 200) {

            // 操作失败，根据后端状态码，判断错误类型作出相应操作操作提示
            if (code === 400) {
                // this.$message({
                //     type: 'warning',
                //     showClose: true,
                //     message: '呀，错误请求，在尝试一次吧T~t'
                // })
                this.$msgWarning('呀，错误请求，在尝试一次吧T~t')
                return Promise.reject('error')
            }

            if (code === 404) {
                //todo：跳转指定404页面
            }

            if (code === 500) {
                this.$msgWarning('呀，服务器繁忙，等等再试一下吧:)')
                return Promise.reject('error')
            }

            if (code >= 2000 && code < 3000) {
                this.$msgWarning('参数有误，再确认一下哦:)')
                return Promise.reject('error')
            }

            if (code >= 4000 && code < 4004) {
                this.$msgWarning('认证失败，重新登录试一下⑧')
                return Promise.reject('error')
            }

            if (code === 4005) {
                // todo：无感刷新 token
                // 保存当前失败请求配置
                const config = response.config
                if (!isRefreshing) {    // 还未请求刷新 token 接口
                    isRefreshing = true
                    console.log(store)
                    const {accessToken, refreshToken} = store.token
                    const param = {
                        accessToken,
                        refreshToken
                    }
                    store.dispatch('refreshToken', param).then(res => {
                        const accessToken = res['accessToken'];
                        service.defaults.headers['Authorization'] = accessToken
                        config.headers['Authorization'] = accessToken
                        config.baseURL = ''
                        // 已经刷新了token，将所有队列中的请求进行重试
                        requests.forEach(cb => cb(accessToken))
                        requests = []
                        return service(config)
                    }).catch(res => {
                        console.error('refreshtoken error =>', res)
                        this.$msgWarning("登录过期，请重新登录")
                    }).finally(() => {
                        isRefreshing = false
                    })
                } else {
                    // 正在刷新token，将返回一个未执行resolve的promise
                    return new Promise(resolve => {
                        // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
                        requests.push((token) => {
                            config.baseURL = ''
                            config.headers['Authorization'] = token
                            resolve(service(config))
                        })
                    })
                }
                return response
            }
            return Promise.reject(res.msg)
        } else {
            return res.data
        }
    },
    error => {
        this.$msgWarning('连接超时')
        return Promise.reject('error')
    }
)

export default service
