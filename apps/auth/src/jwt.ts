import * as jwt from 'jsonwebtoken';
import { IJwtPayload } from './interfaces/jwt.interface';
export const verifyToken = (token: string): Promise<IJwtPayload> | Error => {
  return new Promise((resolve, reject) =>
    jwt.verify(token, 'SECRET', (err, decoded) =>
      err ? reject({}) : resolve(decoded as IJwtPayload),
    ),
  );
};

export const signToken = (payload: IJwtPayload): Promise<string> => {
  return new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      'SECRET',
      {
        expiresIn: '1d',
      },
      (err, token) => (err ? reject({}) : resolve(token)),
    ),
  );
};
