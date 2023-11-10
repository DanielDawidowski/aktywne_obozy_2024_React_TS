import styled, { keyframes } from "styled-components";
import { IToast } from "../../interfaces/notification/notification.interface";

const toastInRight = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const toastInLeft = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
`;

export const ToastContainer = styled.div<Partial<IToast>>`
  position: fixed;
  z-index: 999999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: ${(props) => props.theme.size3};

  &.top-right {
    top: 12px;
    right: 12px;
    transition: transform 0.6s ease-in-out;
    animation: ${toastInRight} 0.7s;
  }

  &.bottom-right {
    bottom: 12px;
    right: 12px;
    transition: transform 0.6s ease-in-out;
    animation: ${toastInRight} 0.7s;
  }

  &.top-left {
    top: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: ${toastInLeft} 0.7s;
  }

  &.bottom-left {
    bottom: 12px;
    left: 12px;
    transition: transform 0.6s ease-in;
    animation: ${toastInLeft} 0.7s;
  }
`;

export const ToastNotification = styled.div<{ backgroundColor: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.size3};
  background: ${({ backgroundColor }) => backgroundColor};
  border-radius: 5px;
  color: ${(props) => props.theme.white};
  opacity: 0.9;
  box-shadow: 0 0 10px ${(props) => props.theme.dark};
  margin-bottom: 12px;

  .toast-notification-image {
    margin: 10px;
    padding: 10px;
    padding: ${(props) => props.theme.size3};
  }

  .toast-notification-message {
    height: 100%;
    margin: 10px;
    padding: 10px;
    display: grid;
    place-items: center;
    h3 {
      color: white;
      font-size: 22px;
    }
  }

  &:hover {
    box-shadow: 0 0 10px #2c3333;
    cursor: pointer;
  }
`;

export const CancelButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-weight: 700;
  cursor: pointer;
  margin: 10px;
  padding: 10px;
  font-size: 22px;
  &:hover {
    color: #f05454;
  }
`;
