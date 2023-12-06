export interface IRegisterData {
  username: string;
  email: string;
  password: string;
  role: string;
}

export type ILoginData = Omit<IRegisterData, "email" | "role">;

export interface ISignUpData {
  _id: string;
  uId: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  role: string;
  authId: string;
}

export type ILoginResponse = Partial<ISignUpData> & { token: string };

export type OmitPasswrodLoginData = Omit<ISignUpData, "password">;

export interface ILoginUser {
  token: string;
  profile: OmitPasswrodLoginData | null;
}

export interface IUser {
  _id: string;
  authId: string;
  role: string;
  username: string;
}

export type IProfileProps = Pick<ISignUpData, "authId" | "username">;
