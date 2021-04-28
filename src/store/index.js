import Vue from 'vue'
import Vuex from 'vuex'
import {getToken, setToken, removeToken} from '@/plugins/token'
import {
    SET_TOKEN,
    SET_REFRESH_TOKEN,
    SET_USERINFO
} from './mutation-types'


Vue.use(Vuex)


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

import {login} from "@/api/login";

const actions = {
    // 登录
    login({commit}, loginFrom) {
        return new Promise(((resolve, reject) => {
            login(loginFrom.username, loginFrom.password).then(data => {
                let accessToken = data.date['access_token'];
                let refreshToken = data.date['refresh_token'];
                commit(SET_TOKEN, accessToken, refreshToken)
                setToken(accessToken, refreshToken)
            }).catch(error => {
                reject(error)
            })
        }))
    },

    getUserInfo({commit}) {

    }
}
const modules = {}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules
})
