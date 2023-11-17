import React, { useState, ReactElement } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { AxiosResponse } from "axios";
import { ISignUpData } from "../../../interfaces/auth/auth.interface";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useAppDispatch, useAppSelector } from "../../../redux-toolkit/hooks";
import { authService } from "../../../services/api/auth/auth.service";
import { addUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { IReceiver, ISender } from "../../../interfaces/chat/chat.interface";
import { ChatUtils } from "../../../utils/chat-utils.service";

const ChatRegister: FC = (): ReactElement => {
  const { admin } = useAppSelector((state) => state.admin);
  const [username, setUsername] = useState<string>("daniel");
  const [email, setEmail] = useState<string>("dvds@wp.pl");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const setUserName = useLocalStorage<ISignUpData>("user");

  const dispatch = useAppDispatch();

  const registerTempUser = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    // const password = Utils.generateString(10);
    try {
      const response: AxiosResponse = await authService.signUp({
        username,
        email,
        password: "qwerty",
        role: "user"
      });
      const currentUser: ISender = {
        senderId: response.data.user._id,
        senderName: response.data.user.username
      };
      const currentAdmin: IReceiver = {
        receiverId: admin._id,
        receiverName: admin.username
      };
      dispatch(addUser({ token: response.data.token, profile: response.data.user }));
      setLoading(false);
      setUserName.set(response.data.user);
      ChatUtils.joinRoomEvent(currentAdmin, currentUser);
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message);
    }
  };

  return (
    <div className="chat__body__wrapper__regiester">
      {loading && <div className="chat__loading">Loading...</div>}
      {errorMessage && <div className="chat__body__wrapper__regiester__error">{errorMessage}</div>}
      <form onSubmit={registerTempUser}>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          placeholder="Enter Username"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
        />
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
        />
        <button className="auth-button button" disabled={!username || !email} onClick={() => registerTempUser}>
          wyslij
        </button>
      </form>
    </div>
  );
};

export default ChatRegister;
