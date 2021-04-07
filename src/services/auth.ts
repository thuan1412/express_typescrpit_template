import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../entities/user";
import UserCredentials from "../entities/user-credentials";
import { JwtPayload, UserLoginDto, UserRegisterDto } from "../types/auth.type";
import bcrypt from "bcrypt";
import { promisify } from "util";

/*
 * @param userRegisterDto data for create new user
 * @return {string} accessToken
 */
const register = async (userRegisterDto: UserRegisterDto): Promise<string> => {
  const userRepository = getRepository(User);
  const userCredentialsRepository = getRepository(UserCredentials);
  const hashPromise = promisify(bcrypt.hash);

  const user = userRepository.create(userRegisterDto);

  await userRepository.save(user);
  const userCredentials = new UserCredentials();
  userCredentials.user_id = user.id;

  userCredentials.password = await hashPromise(userRegisterDto.password, 10);
  await userCredentialsRepository.save(userCredentials);

  const jwtPayload: JwtPayload = {
    userId: user.id,
  };
  const accessToken = jwt.sign(jwtPayload, "123");

  return accessToken;
};

/*
 * Login service
 * @param {UserLoginDto} userLoginDto
 * @return {string} accessToken if the user login data is correct
 * @throws {RecordNotFound} if user not found
 * @throws {....} if password isn't correct
 */
const login = async (userLoginDto: UserLoginDto) => {
  const userRepository = getRepository(User);
  const userCredentialsRepository = getRepository(UserCredentials);

  const bcryptComparePromise = promisify(bcrypt.compare);
  const user = await userRepository.findOne({
    where: {
      email: userLoginDto.email,
    },
    relations: ["userCredentials"],
  });
  if (!user) return "0";

  const isCorrectPassword = await bcryptComparePromise(
    userLoginDto.password,
    user.userCredentials.password
  );

  if (!isCorrectPassword) return "1";

  const jwtPayload: JwtPayload = {
    userId: user.id,
  };
  const accessToken = jwt.sign(jwtPayload, process.env.JWT_KEY || "");
  return accessToken;
};

const find = async (id: number) => {
  const userRepository = getRepository<User>(User);
  const user = await userRepository.findOne({
    where: {
      id: id,
    },
  });
  return user;
};

export default {
  find,
  login,
  register,
};
