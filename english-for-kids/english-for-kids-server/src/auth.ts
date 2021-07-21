import { NextFunction, Request, Response } from 'express';
import jwt, { VerifyErrors } from 'jsonwebtoken';

const accessTokenSecret = 'catdogelephant';

export default function auth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, accessTokenSecret, (err: VerifyErrors | null) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      next();
    });
  } else {
    res.sendStatus(403);
  }
}

export function getAccessToken(userLogin: string): string {
  return jwt.sign({ username: userLogin, role: 'admin' }, accessTokenSecret);
}
