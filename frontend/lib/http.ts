import axios, { AxiosError } from "axios";

export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // REQUIRED
    withCredentials: true, // refreshToken cookie
});

/* =========================
   Request interceptor
========================= */
import axios from "axios"

export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
})

http.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

http.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config as any
        const status = error.response?.status
        const url = original?.url || ""

        if (status === 401 && url.includes("/user/profile/password")) {
            return Promise.reject(error)
        }

        if (
            status === 401 &&
            (url.includes("/user/login") || url.includes("/user/refresh"))
        ) {
            return Promise.reject(error)
        }

        if (status === 401 && !original._retry) {
            original._retry = true

            try {
                const refreshRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
                    { withCredentials: true }
                )

                const newToken =
                    refreshRes.headers.authorization?.split(" ")[1]

                if (!newToken) throw new Error("No token")

                localStorage.setItem("accessToken", newToken)
                original.headers.Authorization = `Bearer ${newToken}`

                return http(original)
            } catch {
                localStorage.removeItem("accessToken")
                window.location.href = "/login"
                return Promise.reject(error)
            }
        }

        return Promise.reject(error)
    }
)


/* =========================
   Response interceptor
   (auto refresh token)
========================= */
let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

http.interceptors.response.use(
    (res) => res,
    async (error) => {
        const original = error.config as any;

        if (
            error.response?.status === 401 &&
            !original._retry &&
            !original.url?.includes("/user/login") &&
            !original.url?.includes("/user/refresh")
        ) {
            original._retry = true;

            try {
                const refreshRes = await axios.get(
                    `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
                    { withCredentials: true }
                );

                const newToken =
                    refreshRes.headers.authorization?.split(" ")[1];

                if (!newToken) throw new Error("No token");

                localStorage.setItem("accessToken", newToken);
                original.headers.Authorization = `Bearer ${newToken}`;

                return http(original);
            } catch {
                localStorage.removeItem("accessToken");
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
