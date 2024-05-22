import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from "../configs"


interface ReqWithUser extends Request {
    user?: any;
}

export const authCheck = (req: ReqWithUser, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Extracted Token:", token);
    console.log(" congig :  ", config.jwt_secret);
    if (!token) return res.sendStatus(401);

    jwt.verify(token, config.jwt_secret, (err, user) => {
        console.log(user);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}