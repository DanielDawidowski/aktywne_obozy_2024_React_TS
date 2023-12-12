import { Dispatch } from "@reduxjs/toolkit";
import { addNotification, clearNotification } from "../redux-toolkit/reducers/notifications/notifications.reducer";
import { INotificationTypes } from "../interfaces/notification/notification.interface";
import { BreakPoint } from "../components/layout/Layout.interface";

export class Utils {
  static dispatchNotification(message: string, type: INotificationTypes, dispatch: Dispatch): void {
    dispatch(addNotification({ message, type }));
  }

  static dispatchClearNotification(dispatch: Dispatch): void {
    dispatch(clearNotification());
  }

  static generateString(length: number): string {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static getStringLength(message: string, length: number): string {
    return message.slice(0, length);
  }

  static getFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase();
  }

  static checkIfUserIsOnline(username: string | null, onlineUsers: string[] | null): boolean | undefined {
    return onlineUsers?.some((user) => user.toLowerCase() === username?.toLowerCase());
    return false;
  }

  static emitIconsAmount(windowSize: number): number {
    switch (true) {
      case windowSize <= BreakPoint.xsmall:
        return 2;
      case windowSize <= BreakPoint.small:
        return 4;
      case windowSize <= BreakPoint.medium:
        return 6;
      case windowSize <= BreakPoint.large:
        return 8;
      case windowSize <= BreakPoint.xlarge:
        return 10;
      default:
        return 10;
    }
  }

  static setCookie = (name: string, value: string, days: number): void => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);

    const cookieData = {
      name,
      value,
      expires: expirationDate.getTime()
    };

    localStorage.setItem(name, JSON.stringify(cookieData));
  };

  static getCookie = (name: string): string | null => {
    const cookieDataString = localStorage.getItem(name);

    if (cookieDataString) {
      const cookieData = JSON.parse(cookieDataString);

      // Check if the cookie has expired
      if (cookieData.expires && cookieData.expires > Date.now()) {
        return cookieData.value;
      }
    }

    return null;
  };

  static deleteCookie = (name: string): void => {
    localStorage.removeItem(name);
  };

  static scrollToElement = (id: string, time: number): void => {
    const element = document.getElementById(id);
    console.log("element", element);
    if (element) {
      const targetPosition = element.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition - 80;
      const startTime = performance.now();
      const duration = time; // 5 seconds in milliseconds

      const scrollAnimation = (currentTime: number): void => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        window.scrollTo(0, startPosition + distance * progress);

        if (progress < 1) {
          requestAnimationFrame(scrollAnimation);
        }
      };

      requestAnimationFrame(scrollAnimation);
    }
  };
}

export const scrollToElement = (id: string, time: number): void => {
  const element = document.getElementById(id);
  console.log("element", element);
  if (element) {
    const targetPosition = element.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition - 80;
    const startTime = performance.now();
    const duration = time; // 5 seconds in milliseconds
    console.log("distance", distance);
    console.log("startPosition", startPosition);
    console.log("targetPosition", targetPosition);
    console.log("startTime", startTime);
    console.log("duration", duration);

    const scrollAnimation = (currentTime: number): void => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      window.scrollTo(0, startPosition + distance * progress);

      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    };

    requestAnimationFrame(scrollAnimation);
  }
};
