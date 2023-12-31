import React, { useCallback, useState, ReactNode, ReactElement, useEffect } from "react";
import type { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import { userService } from "../../services/api/user/user.service";
import { getConversationList } from "../../redux-toolkit/api/chat";
import { addUser, clearUser } from "../../redux-toolkit/reducers/user/user.reducer";
import useEffectOnce from "../../hooks/useEffectOnce";
import { ISignUpData } from "../../interfaces/auth/auth.interface";
import { socketService } from "../../services/socket/socket.service";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }): ReactElement => {
  const { profile, token } = useAppSelector((state) => state.user);
  const [userData, setUserData] = useState<ISignUpData | null>(null);
  const [tokenIsValid, setTokenIsValid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkUser = useCallback(async () => {
    try {
      const response = await userService.checkCurrentUser();
      dispatch(getConversationList());
      setUserData(response.data.user);
      setTokenIsValid(true);
      dispatch(
        addUser({
          token: response.data.token,
          profile: response.data.user
        })
      );
    } catch (error) {
      setTokenIsValid(false);
      setTimeout(async () => {
        dispatch(clearUser());
        await userService.logoutUser();
        navigate("/");
      }, 1000);
    }
  }, [dispatch, navigate]);

  useEffectOnce(() => {
    checkUser();
  });

  useEffect(() => {
    socketService.socketConnetction();
  }, [dispatch]);

  if (userData || (profile && token)) {
    if (!tokenIsValid) {
      return <></>;
    } else {
      return <>{children}</>;
    }
  } else {
    return <>{<Navigate to="/" />}</>;
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};

export default ProtectedRoute;
