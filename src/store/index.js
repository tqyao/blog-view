import {createStore} from 'vuex'
import {getToken, setToken, removeToken} from '@/plugins/token'
// import Vue from 'vue'
// Vue.use(Vuex)

import {SET_TOKEN} from './mutation-types'

export default createStore({
    state: {
        token: getToken()
    },
    mutations: {
        [SET_TOKEN]: (state, token) => {
            state.token = token;
        }
    },
    actions: {},
    modules: {}
})
