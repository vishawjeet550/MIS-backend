import { Response } from 'express';
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
