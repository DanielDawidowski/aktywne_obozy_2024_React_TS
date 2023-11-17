import React, { useState, useEffect, FormEvent, ReactElement } from "react";
import type { FC } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { authService } from "../../../services/api/auth/auth.service";
import { addUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { ISignUpData } from "../../../interfaces/auth/auth.interface";
import { socketService } from "../../../services/socket/socket.service";
import { Dispatch } from "@reduxjs/toolkit";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Login: FC = (): ReactElement => {
  const [username, setUsername] = useState<string>("marcin");
  const [password, setPassword] = useState<string>("qwerty");
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<ISignUpData | null>();
  const [hasError, setHasError] = useState<boolean>(false);
  const userStorage = useLocalStorage<ISignUpData>("user");
  const setToken = useLocalStorage<string>("token");

  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();

  const loginUser = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    setLoading(true);
    e.preventDefault();
    try {
      const result = await authService.signIn({
        username,
        password
      });
      // return result;
      setUser(result.data.user);
      setToken.set(result.data.token);
      userStorage.set(result.data.user);
      dispatch(
        addUser({
          token: result.data.token,
          profile: {
            ...result.data.user,
            username: result.data.user.username,
            _id: result.data.user._id,
            role: result.data.user.role
          }
        })
      );
      setUser(result.data.user);
      setLoading(false);
      socketService?.socket.emit("setup", {
        userId: result && result.data.user.username.toLowerCase()
      });
    } catch (error: any) {
      setLoading(false);
      setHasError(true);
      console.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return;
    if (user) navigate("/");
  }, [loading, user, navigate]);

  return (
    <div className="auth-inner" style={{ display: "grid", placeItems: "center" }}>
      <form className="auth-form" onSubmit={loginUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            placeholder="Enter Username"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter Password"
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
          />
        </div>
        <Button className="auth-button button" disabled={!username || !password}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
