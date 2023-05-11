import { Response, ErrorRequestHandler, NextFunction, Request } from 'express';
import jwt from 'jsonwebtoken';

export function verifyToken(req: any, res: Response, next: any) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY ?? 'my_secret_key');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
};

export const sendResponseHandler = (statusCode: number, message: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
        res.status(statusCode).send(message);
    };
}

export const sendErrorResponse = (res: any, message: string, err_code = 422) => {
    return res.status(err_code).send([message]);
}