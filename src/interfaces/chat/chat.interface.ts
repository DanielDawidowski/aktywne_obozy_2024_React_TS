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
  senderName: string;
  senderId: string;
  body: string;
  createdAt?: Date | string;
  type?: TypeMessages;
}

export type TypeMessages = EChatTypes.left | EChatTypes.right;

export enum EChatTypes {
  left = "LEFT",
  right = "RIGHT",
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

export type IReceiver = Pick<ISenderReceiver, "receiverId" | "receiverName">;

export type ISender = Pick<ISenderReceiver, "senderId" | "senderName">;

export interface IURLParams {
  username: string;
  _id: string;
}
