export interface IChat {
  isOpenChat?: boolean;
}

export interface ISenderReceiver {
  senderId: string;
  receiverId: string;
  senderName: string;
  receiverName: string;
}

export interface IChatMessage {
  _id: string;
  conversationId: string;
  receiverId: string;
  receiverName: string;
  senderName?: string;
  senderId?: string;
  body: string;
  createdAt?: Date | string;
}

export interface IChatListUser extends IChatMessage {
  disconnected?: boolean;
}

export type TypeMessages = EChatTypes.left | EChatTypes.right;

export enum EChatTypes {
  left = "LEFT",
  right = "RIGHT"
}

export interface IChatUsers {
  userOne: string;
  userTwo: string;
}

export interface IMessageData {
  conversationId: string;
  receiverId?: string;
  receiverName?: string;
  body: string;
}

export type IReceiverType = Pick<ISenderReceiver, "receiverId" | "receiverName">;

export type IReceiver = Partial<IReceiverType>;

export type ISenderType = Pick<ISenderReceiver, "senderId" | "senderName">;

export type ISender = Partial<ISenderReceiver>;

export interface IURLParams {
  username?: string;
  _id?: string;
}

export interface INewChatUser {
  conversationId: string;
  receiverId: string;
  receiverName: string;
  senderName: string;
  senderId: string;
  body: string;
}
