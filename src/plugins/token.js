export function getToken() {
    return JSON.parse(localStorage.getItem("token"))
}

export function setToken(accessToken, refreshToken) {
    const token = {
        accessToken,
        refreshToken
    }
    return localStorage.setItem("token", JSON.stringify(token))
}

export function removeToken() {
    return localStorage.removeItem('token')
}
