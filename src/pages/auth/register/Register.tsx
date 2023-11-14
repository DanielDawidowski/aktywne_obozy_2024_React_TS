import React, { useState, useEffect, FormEvent, ReactElement } from "react";
import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { authService } from "../../../services/api/auth/auth.service";
import { addUser } from "../../../redux-toolkit/reducers/user/user.reducer";
import { IRegisterData } from "../../../interfaces/auth/auth.interface";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";

const Register: FC = (): ReactElement => {
  const [username, setUsername] = useState<string>("marcin");
  const [email, setEmail] = useState<string>("mar@wp.pl");
  const [password, setPassword] = useState<string>("qwerty");
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [user, setUser] = useState<IRegisterData | null>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const registerUser = async (event: FormEvent): Promise<void> => {
    setLoading(true);
    event.preventDefault();
    try {
      const result = await authService.signUp({
        username,
        email,
        password,
        role: "admin"
      });
      dispatch(addUser({ token: result.data.token, profile: result.data.user }));
      setUser(result.data.user);
      // return result;
      setLoading(false);
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
    <div className="auth-inner">
      <form className="auth-form" onSubmit={registerUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            placeholder="Enter Username"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event.target.value)}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          />
          <Input
            id="email"
            name="email"
            type="text"
            value={email}
            placeholder="Enter Email"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            placeholder="Enter Password"
            handleChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
            style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          />
        </div>
        <Button className="auth-button button" disabled={!username || !email || !password}>
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
};

export default Register;
