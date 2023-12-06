import React, { useState, ReactElement } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { ISignUpData } from "../../../interfaces/auth/auth.interface";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { authService } from "../../../services/api/auth/auth.service";
import { addUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import Input from "../../input/Input";
import Button from "../../button/Button";
import { ButtonColor } from "../../button/Button.interface";
import Logo from "../../logo/Logo";
import { Flex, Grid } from "../../globalStyles/global.styles";
import Spinner from "../../spinner/Spinner";
import { ChatRegisterStyles } from "../ChatBoxStyles";
import { FormItemStyles } from "../../form/Form.styles";
import { ValidationError } from "../../../interfaces/error/Error.interface";
import { Utils } from "../../../utils/utils.service";
import { socketService } from "../../../services/socket/socket.service";

const ChatRegister: FC = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>("");
  const storedUser = useLocalStorage<ISignUpData>("user");

  const dispatch = useAppDispatch();

  const registerTempUser = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    // const password = Utils.generateString(10);
    try {
      const response: AxiosResponse = await authService.signUp({
        username,
        email,
        password: Utils.generateString(10),
        role: "user"
      });
      dispatch(addUser({ token: response.data.token, profile: response.data.user }));
      setLoading(false);
      storedUser.set(response.data.user);
      socketService.socketConnetction();
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        setLoading(false);
        setErrorMessage(error.response?.data?.message);
      } else {
        console.error(error);
      }
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
          {errorMessage && (
            <Flex $align="center" $justify="center">
              {errorMessage}
            </Flex>
          )}
          <Grid>
            <Logo width="85px" height="125px" />
          </Grid>
          <form onSubmit={registerTempUser}>
            <FormItemStyles>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                placeholder="Enter Username"
                handleChange={(event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
              />
            </FormItemStyles>
            <FormItemStyles>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                placeholder="Enter Email"
                handleChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              />
            </FormItemStyles>
            <FormItemStyles>
              <Button color={ButtonColor.primary} disabled={!username || !email}>
                wyslij
              </Button>
            </FormItemStyles>
          </form>
        </>
      )}
    </ChatRegisterStyles>
  );
};

export default ChatRegister;
