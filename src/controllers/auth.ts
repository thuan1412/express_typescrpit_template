import authService from "../services/auth";
import { Request, Response } from "express";
import { UserLoginDto, UserRegisterDto } from "../types/auth.type";

export const register = async (req: Request, res: Response) => {
  const userRegisterDto: UserRegisterDto = req.body;
  try {
    const accessToken = await authService.register(userRegisterDto);
    res.json({ accessToken: accessToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

export const login = async (req: Request, res: Response) => {
  const userLoginDto: UserLoginDto = req.body;
  const accessToken = await authService.login(userLoginDto);
  res.json({ accessToken: accessToken });
};

export const me = async (req: Request, res: Response) => {
  const user = req.body.user;
  res.json(user);
};
