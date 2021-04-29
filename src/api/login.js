import axios from "@/plugins/axios";

export function login(username, password) {
    const data = {
        username,
        password
    }
    return axios({
        url: '/login',
        method: 'post',
        data
    })
}

export function refreshToken(accessToken, refreshToken) {
    const url = `/members/refresh-token/${accessToken}/${refreshToken}`
    return axios({
        url,
        method: 'get'
    })
}