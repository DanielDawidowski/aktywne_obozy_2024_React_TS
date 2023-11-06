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

export interface ILoginUser {
  token: string;
  profile: ISignUpData;
}

export interface IUser {
  _id: string;
  authId: string;
  role: string;
  username: string;
}

export type IProfileProps = Pick<ISignUpData, "authId" | "username">;

export interface INewChatUser {
  conversationId: string;
  receiverId: string;
  receiverName: string;
  senderName: string;
  senderId: string;
  body: string;
}
