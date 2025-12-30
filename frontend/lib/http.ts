import axios, { AxiosError } from "axios";

export const http = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL, // REQUIRED
    withCredentials: true, // refreshToken cookie
});

/* =========================
   Request interceptor
========================= */
http.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

/* =========================
   Response interceptor
   (auto refresh token)
========================= */
let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

http.interceptors.response.use(
    (res) => res,
    async (error: AxiosError<any>) => {
        const original = error.config as any;

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;
                try {
                    const refreshRes = await axios.get(
                        `${process.env.NEXT_PUBLIC_API_URL}/user/refresh`,
                        { withCredentials: true }
                    );

                    const newToken =
                        refreshRes.headers.authorization?.split(" ")[1];

                    if (!newToken) throw new Error("No refresh token");

                    localStorage.setItem("accessToken", newToken);
                    queue.forEach((cb) => cb(newToken));
                    queue = [];
                } catch {
                    localStorage.removeItem("accessToken");
                    window.location.href = "/login";
                    return Promise.reject(error);
                } finally {
                    isRefreshing = false;
                }
            }

            return new Promise((resolve) => {
                queue.push((token: string) => {
                    original.headers.Authorization = `Bearer ${token}`;
                    resolve(http(original));
                });
            });
        }

        return Promise.reject(error);
    }
);
