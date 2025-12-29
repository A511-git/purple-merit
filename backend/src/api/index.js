import { Router } from "express";

export const api = () => {
    const router = Router();

    router.get("/ping", (req, res) => {
        res.send("pong");
    })

    return router;
};
