import axios from "axios";
import NProgress from 'nprogress'
import store from '@/store'
import 'nprogress/nprogress.css'

import {getToken, setToken} from "@/plugins/token";
import {ElMessage} from 'element-plus'

import {
    SET_TOKEN,
    SET_REFRESH_TOKEN,
    SET_USERINFO
} from '@/store/mutation-types'

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


//刷新请求刷新token接口方法
function refreshToken() {

    const {accessToken, refreshToken} = store.state.token

    // console.log("function refreshToken() :accessToken:refreshToken" + accessToken + "\n" + refreshToken)
    // console.log('刷新请求刷新token接口方法 =>\n' + accessToken + "\n" + refreshToken);

    // service是当前request.js中已创建的axios实例
    return service.get(`/members/refresh-token/${accessToken}/${refreshToken}`)
}

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
                ElMessage({
                    message: '呀，错误请求，在尝试一次吧T~t',
                    type: 'warning',
                    showClose: true
                })
                return Promise.reject('error')
            }

            if (code === 404) {
                //todo：跳转指定404页面
            }

            if (code === 500) {
                // this.$msgWarning('呀，服务器繁忙，等等再试一下吧:)')
                ElMessage({
                    message: '呀，服务器繁忙，等等再试一下吧:)',
                    type: 'warning',
                    showClose: true
                })
                return Promise.reject('error')
            }

            if (code >= 2000 && code < 3000) {
                ElMessage({
                    message: '参数有误，再确认一下哦:)',
                    type: 'warning',
                    showClose: true
                })
                return Promise.reject('error')
            }

            if (code >= 4000 && code < 4004) {
                ElMessage({
                    message: '认证失败，重新登录试一下ba:D',
                    type: 'warning',
                    showClose: true
                })
                return Promise.reject('error')
            }

            // debugger
            if (code === 4005) {

                // todo：无感刷新 token
                // 保存当前失败请求配置
                const config = response.config
                if (!isRefreshing) {    // 还未请求过刷新 token 接口

                    isRefreshing = true
                    // var token = store.state.token
                    // store.dispatch('refreshTokenAction', token).then(res => {
                    refreshToken().then(res => {

                        // debugger

                        const {accessToken, refreshToken} = res

                        // console.log('响应拦截器中 =>');
                        // console.log(accessToken, refreshToken);

                        service.defaults.headers['Authorization'] = accessToken
                        config.headers['Authorization'] = accessToken
                        setToken(accessToken, refreshToken)
                        store.commit(SET_TOKEN, {accessToken, refreshToken})

                        // url已经带上了/api，避免出现/api/api的情况
                        config.baseURL = ''
                        // 已经刷新了token，将所有队列中的请求进行重试
                        requests.forEach(cb => cb(accessToken))
                        // 重试完了别忘了清空这个队列
                        requests = []
                        // 重试当前请求并返回promise
                        return service(config)
                    }).catch(res => {
                        //刷新token失败，神仙也救不了了，跳转到首页重新登录吧

                        console.log('refreshtoken error =>', res)

                        ElMessage({
                            message: '登录过期，请重新登录;P',
                            type: 'warning',
                            showClose: true
                        })
                        return Promise.reject('error')
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
                // return response
            }
            // return Promise.reject(res.msg)
        } else {
            return res.data
        }
    },
    error => {
        ElMessage({
            message: '连接超时',
            type: 'warning',
            showClose: true
        })
        return Promise.reject('error')
    }
)

export default service
