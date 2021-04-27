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