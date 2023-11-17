import React, { ReactElement, useEffect, useRef, useState } from "react";
import type { ChangeEvent, FC, FormEvent, SetStateAction, Dispatch } from "react";
import PropTypes from "prop-types";

interface IMessageInput {
  setChatMessage: Dispatch<SetStateAction<string>>;
}

const MessageInput: FC<IMessageInput> = ({ setChatMessage }): ReactElement => {
  const [message, setMessage] = useState<string>("");
  const messageInputRef = useRef<HTMLInputElement>(null);

  const handleClick = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // setChatMessage(message.replace(/ +(?= )/g, ""), "");
    setChatMessage(message);
    setMessage("");
  };

  useEffect(() => {
    if (messageInputRef?.current) {
      messageInputRef.current.focus();
    }
  }, [setChatMessage]);

  return (
    <>
      <div className="chat-inputarea" data-testid="chat-inputarea">
        <form onSubmit={handleClick}>
          <input
            ref={messageInputRef}
            id="message"
            name="message"
            type="text"
            value={message}
            className="chat-input"
            placeholder="Enter your message..."
            onChange={(event: ChangeEvent<HTMLInputElement>) => setMessage(event.target.value)}
          />

          <button type="submit" className="chat-send" style={{ backgroundColor: "blue" }}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

MessageInput.propTypes = {
  setChatMessage: PropTypes.func.isRequired
};

export default MessageInput;
