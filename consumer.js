import config from "./config";

const baseUrl = config.BASE_URL

export default class BackendConsumer {

    constructor(auth = null, setAuth = () => { }) {
        this.auth = auth;
        this.setAuth = setAuth;
    }

    make_headers(needAuth = true, accessToken = null) {

        const headers = {
            'Content-Type': 'application/json'
        }

        if (this.auth && needAuth) {
            if (accessToken) {
                headers['Authorization'] = `Bearer ${accessToken}`
            } else {
                headers['Authorization'] = `Bearer ${this.auth.accessToken}`
            }
        }

        return headers
    }

    async do_get(url, params = {}, needAuth = true,accessToken = null) {

        const urlParams = new URLSearchParams(params).toString()
        const headers = this.make_headers(needAuth, accessToken)
        const response = await fetch(`${baseUrl}${url}?${urlParams}`, {
            headers: headers
        })
        if (needAuth && response.status === 401) {
            const accessToken = await this.refresh()
            if (!accessToken) return null
            return await this.do_get(url, params, needAuth,accessToken)
        }
        return await response.json()
    }

    async do_post(url, data, needAuth,accessToken = null) {

        const headers = this.make_headers(needAuth, accessToken)
        const response = await fetch(`${baseUrl}${url}`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        })

        if (needAuth && response.status === 401) {
            const accessToken = await this.refresh()
            if (!accessToken) return 
            return await this.do_post(url, data, needAuth,accessToken)
        }

        return await response.json()
    }

    async refresh() {
        if (!this.auth.isAuthenticated()){
            return false
        }
        const response = await fetch(`${baseUrl}/auth/token/refresh/`, {
            method: "POST",
            headers: this.make_headers(false),
            body: JSON.stringify({
                refresh: this.auth.refreshToken
            })
        })
        if (response.status === 200){
            const data = await response.json()
            this.setAuth(this.auth.refreshToken, data.access)
            return data.access
        }
        localStorage.clear()
        return false
    }
}