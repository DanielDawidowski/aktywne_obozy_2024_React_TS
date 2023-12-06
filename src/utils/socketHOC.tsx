import React, { useEffect } from "react";
import { fetchAdminUsers } from "../redux-toolkit/api/admin";
import { useAppDispatch } from "../redux-toolkit/hooks";
import { socketService } from "../services/socket/socket.service";

export const withSocket = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  return function WithAdminUsersAndSocket(props: P) {
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchAdminUsers());
    }, [dispatch]);

    useEffect(() => {
      socketService.socketConnetction();
    });

    return <WrappedComponent {...props} />;
  };
};
