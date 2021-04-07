import { Request, Response, NextFunction } from "express";
import asyncMiddleware from "../utils/asyncMiddleware";
import authService from "../services/auth";
import { JwtPayload } from "../types/auth.type";
import jwt from "jsonwebtoken";

const authMiddleware = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new Error("NULL AUTHORIZATION KEY");
  }
 
  
  const [tokenType, accessToken] = authorization.split(" ");
  if (tokenType !== 'Bearer') throw new Error("INVALID_TOKEN_TYPE");

  const jwtPayload = await jwt.verify(accessToken, process.env.JWT_KEY || "") as JwtPayload;

  if (!jwtPayload) {
    throw new Error("INVALID_ACCESS_TOKEN");
  }
  
  const user = await authService.find(jwtPayload.userId);
  req.body.user = user;
  next();
};

export default asyncMiddleware(authMiddleware);
