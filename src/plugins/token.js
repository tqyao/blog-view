export function getToken() {
    return localStorage.token
}

export function setToken(accessToken, refreshToken) {
    localStorage.token = {
        accessToken,
        refreshToken
    }
    return localStorage.token
}

export function removeToken() {
    return localStorage.removeItem('token')
}
