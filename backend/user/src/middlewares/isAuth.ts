import type { NextFunction, Response, Request } from 'express';
import type { IUser } from '../model/User.js';
import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import type { Types } from 'mongoose';

export interface AuthenticatedRequest extends Request {
  user?: IUser | null;
}

export const isAuth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ message: 'Please login - no auth header' });
      return;
    }

    const token = authHeader.split(' ')[1] as string;

    const decodedValue = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload & { user?: IUser };

    if (!decodedValue || !decodedValue.user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    req.user = decodedValue.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Please login - jwt error' });
  }
};
