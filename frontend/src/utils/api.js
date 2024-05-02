import axios from "axios"

const api = axios.create({
    baseURL: "http://localhost:3001/api",
})

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("jwtToken")
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized, logging out...")
            localStorage.removeItem("jwtToken")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

export default api
