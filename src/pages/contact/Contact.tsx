import React, { ReactElement, useState } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { ContactStyles } from "./Contact.styles";
import { Container, Flex, Grid } from "../../components/globalStyles/global.styles";
import { useAppDispatch } from "../../redux-toolkit/hooks";
import TextArea from "../../components/textarea/Textarea";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { IEmail } from "../../interfaces/email/Email.interface";
import { emailService } from "../../services/api/email/email.service";
import { Utils } from "../../utils/utils.service";
import { INotificationType } from "../../interfaces/notification/notification.interface";
import { AxiosResponse } from "axios";
import { ButtonColor } from "../../components/button/Button.interface";
import { FormItemStyles, FormStyles } from "../../components/form/Form.styles";
import Spinner from "../../components/spinner/Spinner";
import transition from "../../utils/transition";
import { ValidationError } from "../../interfaces/error/Error.interface";

const initialState: IEmail = {
  senderName: "",
  email: "",
  message: ""
};

const Contact: FC = (): ReactElement => {
  const [values, setValues] = useState<IEmail>(initialState);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [toggle, setToggle] = useState<number>(0);

  const { senderName, email, message } = values;

  const dispatch = useAppDispatch();

  const sendMessage = async (e: FormEvent): Promise<void | undefined> => {
    e.preventDefault();
    try {
      const response: AxiosResponse<IEmail> = await emailService.sendMessage(values);
      Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        setLoading(false);
        setHasError(true);
        setErrorMessage(error?.response?.data.message as string);
        Utils.dispatchNotification(errorMessage, INotificationType.ERROR, dispatch);
      } else {
        console.error(error);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  return (
    <Layout>
      <ContactStyles>
        <Container>
          <Grid>
            <FormStyles>
              <FormItemStyles>
                <Input
                  id="senderName"
                  name="senderName"
                  type="text"
                  value={senderName}
                  labelText="Imię i Nazwisko"
                  placeholder="---"
                  style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                  handleChange={handleChange}
                />
              </FormItemStyles>
              <FormItemStyles>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  value={email}
                  labelText="Email"
                  placeholder="---"
                  style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                  handleChange={handleChange}
                />
              </FormItemStyles>
              <FormItemStyles>
                <TextArea
                  id="message"
                  name="message"
                  value={message}
                  style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
                  onChange={handleChange}
                  label="Wiadomość"
                  placeholder="---"
                  rows={6}
                  cols={30}
                />
              </FormItemStyles>
              <FormItemStyles>
                <Button color={ButtonColor.chat} disabled={!senderName || !email || !message} onClick={sendMessage}>
                  {loading ? (
                    <Flex>
                      <Spinner size={20} />
                      Wysyłanie...
                    </Flex>
                  ) : (
                    "Utwórz"
                  )}
                </Button>
              </FormItemStyles>
            </FormStyles>
          </Grid>
        </Container>
      </ContactStyles>
    </Layout>
  );
};

export default transition(Contact);
