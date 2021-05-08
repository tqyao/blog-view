import { createStore } from 'vuex'
import { getToken, setToken, removeToken, getRefreshToken } from '@/plugins/token'
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

import { login, refreshToken } from '@/api/login'

const actions = {
    // 登录
    login({ commit }, loginFrom) {
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
    refreshTokenAction({ commit }, token) {
        return new Promise(((resolve, reject) => {
            debugger
            console.log('step into refreshTokenAction()')

            // const {accessToken, refreshToken: reToken} = token
            // refreshToken(accessToken, reToken).then(data => {
            refreshToken(token).then(data => {

                console.log(token);

                let accessToken = data['accessToken'];
                let refreshToken = data['refreshToken'];
                console.log(accessToken, refreshToken);
                commit(SET_TOKEN, accessToken, refreshToken)
                setToken(accessToken, refreshToken)
                return data
                // resolve(data)
            }).catch(error => {
                console.log('==');
                console.log(error);
            })
        })).catch(error => {
            console.log('===');
            console.log(error);
        })
    },

    getUserInfo({ commit }) {

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
