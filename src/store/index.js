import {createStore} from 'vuex'
import {getToken, setToken, removeToken, getRefreshToken} from '@/plugins/token'
// import Vue from 'vue'
// Vue.use(Vuex)

import {
    SET_TOKEN,
    SET_REFRESH_TOKEN,
    SET_USERINFO
} from './mutation-types'


const state = {
    userInfo: {
        username: '',
        nickname: '',
        avatar: ''
    },
    token: getToken(),

}

const mutations = {
    [SET_TOKEN]: (state, accessToken, refreshToken) => {
        state.token = {
            accessToken,
            refreshToken
        }

    },
    [SET_REFRESH_TOKEN]: (state, refreshToken) => {
        state.refreshToken = refreshToken;
    },
    [SET_USERINFO]: (state, username, nickname, avatar) => {
        state.userInfo = {
            username,
            nickname,
            avatar
        }
    }

}
const getters = {}

import {login, refreshToken} from '@/api/login'

const actions = {
    // 登录
    login({commit}, loginFrom) {
        return new Promise(((resolve, reject) => {
            login(loginFrom.username, loginFrom.password).then(data => {
                let accessToken = data['accessToken'];
                let refreshToken = data['refreshToken'];
                commit(SET_TOKEN, accessToken, refreshToken)
                setToken(accessToken, refreshToken)
                resolve()
            }).catch(error => {
                reject(error)
            })
        }))
    },
    // 刷新 token
    refreshToken({commit}, token) {
        return new Promise(((resolve, reject) => {
            refreshToken(token.accessToken, token.refreshToken).then(data => {
                let accessToken = data['accessToken'];
                let refreshToken = data['refreshToken'];
                commit(SET_TOKEN, accessToken, refreshToken)
                setToken(accessToken, refreshToken)
            })
        }))
    },

    getUserInfo({commit}) {

    }
}
const modules = {}
export default createStore({
    state,
    getters,
    mutations,
    actions,
    modules
})
