import cors from "cors"
import cookieParser from "cookie-parser";
import express from "express";
import { ErrorHandler } from "./utils/error-handler.js"
import { api } from "./api/index.js"
import { FRONTEND_URL } from "./config/index.js"


export const expressApp = (app) => {

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    app.use(express.static("public"));
    app.use(cookieParser());

    app.use("/api/v1", api())

    app.use(ErrorHandler);
}


// {
//     origin: FRONTEND_URL,
//     credentials: true,
// }
