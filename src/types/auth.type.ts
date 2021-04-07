export interface JwtPayload {
  userId: number; 
}

export interface UserRegisterDto {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface UserLoginDto {
  // TODO: enable both email and username
  email: string;
  password: string;
}
