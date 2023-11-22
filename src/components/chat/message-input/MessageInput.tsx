import React, { ReactElement, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import { IoIosSend } from "react-icons/io";
import PropTypes from "prop-types";
import Input from "../../input/Input";
import Button from "../../button/Button";
import { ButtonColor } from "../../button/Button.interface";
import { MessageInputStyles } from "./MesageInputStyles";

interface IMessageInput {
  setChatMessage: (message: string) => Promise<void>;
}

const MessageInput: FC<IMessageInput> = ({ setChatMessage }): ReactElement => {
  const [message, setMessage] = useState<string>("");
  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    setChatMessage(message.replace(/ +(?= )/g, ""));
    setMessage("");
  };

  useEffect(() => {
    if (messageInputRef?.current) {
      messageInputRef.current.focus();
    }
  }, [setChatMessage]);

  return (
    <MessageInputStyles>
      <form onSubmit={handleClick}>
        <Input
          ref={messageInputRef}
          id="message"
          name="message"
          type="text"
          value={message}
          placeholder="Enter your message..."
          handleChange={(event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
        />

        <Button color={ButtonColor.chat}>
          <IoIosSend />
        </Button>
      </form>
    </MessageInputStyles>
  );
};

MessageInput.propTypes = {
  setChatMessage: PropTypes.func.isRequired
};

export default MessageInput;
