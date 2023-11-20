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
import Input from "../../input/Input";
import Button from "../../button/Button";
import { ButtonColor } from "../../button/Button.interface";
import Logo from "../../logo/Logo";
import { Grid } from "../../globalStyles/global.styles";
import Spinner from "../../spinner/Spinner";
import { ChatRegisterStyles } from "../ChatBoxStyles";

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
    <ChatRegisterStyles>
      {loading ? (
        <Grid>
          <Logo width="85px" height="125px" />
          <Spinner size={100} />
        </Grid>
      ) : (
        <>
          {errorMessage && <div className="chat__body__wrapper__regiester__error">{errorMessage}</div>}
          <Grid>
            <Logo width="85px" height="125px" />
          </Grid>
          <form onSubmit={registerTempUser}>
            <Input
              id="username"
              name="username"
              type="text"
              value={username}
              placeholder="Enter Username"
              handleChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            />
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              placeholder="Enter Email"
              handleChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            />
            <Button color={ButtonColor.primary} disabled={!username || !email} onClick={() => registerTempUser}>
              wyslij
            </Button>
          </form>
        </>
      )}
    </ChatRegisterStyles>
  );
};

export default ChatRegister;
