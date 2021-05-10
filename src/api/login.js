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

export function refreshToken(token) {
    const {accessToken, refreshToken} = token
    const url = `/members/refresh-token/${accessToken}/${refreshToken}`
    console.log(url);
    return axios({
        url,
        method: 'get'
    })
}

export function test(param) {
    return axios({
        url:'/members/member/test',
        method: 'get',
        params: {
            param
        }
    })
}