import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { sendResponseHandler } from '../middlewares/auth.middlewares';

export const generateToken = (req: Request, res: Response, next:  NextFunction) => {
    const payload = {
        id: 123,
        username: 'john_doe',
        role: 'admin'
    };

    const secretKey = 'my_secret_key';
    const options = { expiresIn: '1h' };
    const token = jwt.sign(payload, secretKey, options);

    sendResponseHandler(200, { token })(req, res, next)
}