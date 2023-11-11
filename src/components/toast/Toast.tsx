import React, { useEffect, useCallback, useRef, useState, ReactElement } from "react";
import type { FC } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { cloneDeep } from "lodash";
import { IToast, IToastListItem, IToastPosition } from "../../interfaces/notification/notification.interface";
import { Utils } from "../../utils/utils.service";
import { CancelButton, ToastContainer, ToastNotification } from "./Toast.styles";

const Toast: FC<IToast> = (props): ReactElement => {
  const { toastList, position, autoDelete, autoDeleteTime = 2000 } = props;
  const [list, setList] = useState<IToastListItem[]>(toastList);
  const listData = useRef<Array<{ icon: string; description: string; backgroundColor: string }>>([]);
  const dispatch = useDispatch();

  const deleteToast = useCallback(() => {
    listData.current = cloneDeep(list);
    listData.current.splice(0, 1);
    setList([...listData.current]);
    if (!listData.current.length) {
      list.length = 0;
      Utils.dispatchClearNotification(dispatch);
    }
  }, [list, dispatch]);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const tick = (): void => {
      deleteToast();
    };

    if (autoDelete && toastList.length && list.length) {
      const interval = setInterval(tick, autoDeleteTime);
      return () => clearInterval(interval);
    }
  }, [toastList, autoDelete, autoDeleteTime, list, deleteToast]);

  return (
    <ToastContainer className={`toast-notification-container ${position}`} position={position}>
      {list.map((toast, index) => (
        <ToastNotification key={index} backgroundColor={toast.backgroundColor}>
          <div className="toast-notification-image">
            <img src={toast.icon} alt="" />
          </div>
          <div className="toast-notification-message">
            <h3>{toast.description}</h3>
          </div>
          <CancelButton onClick={() => deleteToast()}>X</CancelButton>
        </ToastNotification>
      ))}
    </ToastContainer>
  );
};

Toast.propTypes = {
  toastList: PropTypes.array.isRequired,
  position: PropTypes.oneOf([
    IToastPosition.TOP_LEFT,
    IToastPosition.TOP_RIGHT,
    IToastPosition.BOTTOM_LEFT,
    IToastPosition.BOTTOM_RIGHT
  ]).isRequired,
  autoDelete: PropTypes.bool.isRequired,
  autoDeleteTime: PropTypes.number
};

export default Toast;
