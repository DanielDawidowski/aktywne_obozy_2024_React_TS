import React, { useState, useCallback, ReactElement } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { BsClock } from "react-icons/bs";
import { IChatSettings } from "../../../interfaces/chat/chat.interface";
import { chatService } from "../../../services/api/chat/chat.service";
import useEffectOnce from "../../../hooks/useEffectOnce";
import Layout from "../../../components/layout/Layout";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { ValidationError } from "../../../interfaces/error/Error.interface";
import { FormItemStyles, FormStyles } from "../../../components/form/Form.styles";
import Input from "../../../components/input/Input";
import Spinner from "../../../components/spinner/Spinner";
import Button from "../../../components/button/Button";
import { ButtonColor } from "../../../components/button/Button.interface";
import { Container, Flex } from "../../../components/globalStyles/global.styles";
import transition from "../../../utils/transition";
import { ChatSettingsData } from "../Admin.styles";
import Calendar from "../../../assets/SVG/calendar";
import Select from "../../../components/select/Select";
import { daysOfWeek } from "../../../utils/chat-utils.service";

const initialState: IChatSettings = {
  startTime: "",
  endTime: "",
  startDay: "",
  endDay: ""
};

const EditSettings: FC = (): ReactElement => {
  const [values, setValues] = useState<IChatSettings>(initialState);
  const [settings, setSettings] = useState<IChatSettings[]>([] as IChatSettings[]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { startTime, endTime, startDay, endDay } = values;

  const dispatch: Dispatch = useAppDispatch();

  const getSettings = useCallback(async () => {
    try {
      const response: AxiosResponse = await chatService.getChatSettings();
      setSettings(response.data.chatSettings);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const updateSettings = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    try {
      const response: AxiosResponse = await chatService.editChatSettings(settings[0]._id as string, values);
      setLoading(false);
      setValues(initialState);
      Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
      window.location.reload();
    } catch (error) {
      if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
        setLoading(false);
        setErrorMessage(error?.response?.data.message as string);
        Utils.dispatchNotification(errorMessage, INotificationType.ERROR, dispatch);
      } else {
        console.error(error);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffectOnce(() => {
    getSettings();
  });

  return (
    <Layout chat={false}>
      <Container $small>
        <ChatSettingsData>
          {loading ? (
            <Spinner />
          ) : (
            settings.map((setting: IChatSettings) => (
              <div key={setting._id}>
                <h3>
                  <Flex $align="center" $justify="flex-start">
                    <Calendar color="green" /> Dzień Otwarcia: {setting.startDay}
                  </Flex>
                </h3>
                <h3>
                  <Flex $align="center" $justify="flex-start">
                    <Calendar color="red" /> Dzień Końca: {setting.endDay}
                  </Flex>
                </h3>
                <h3>
                  <Flex $align="center" $justify="flex-start">
                    <BsClock style={{ fill: "green" }} />
                    Od Godziny: {setting.startTime}
                  </Flex>
                </h3>
                <h3>
                  <Flex $align="center" $justify="flex-start">
                    <BsClock style={{ fill: "red" }} />
                    Do Godziny: {setting.endTime}
                  </Flex>
                </h3>
              </div>
            ))
          )}
          <br />
          <br />
          <h2>Edytuj czas dostępu do chatu</h2>

          <FormStyles>
            <FormItemStyles>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={startTime}
                labelText="Godzina startu"
                placeholder="---"
                handleChange={handleChange}
              />
            </FormItemStyles>
            <FormItemStyles>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={endTime}
                labelText="Godzina zamknięcia"
                placeholder="---"
                handleChange={handleChange}
              />
            </FormItemStyles>
            <FormItemStyles>
              <Select label="Dzień Otwarcia:" options={daysOfWeek} onSelect={(option: string) => setValues({ ...values, startDay: option })} />
            </FormItemStyles>
            <FormItemStyles>
              <Select label="Dzień Końca:" options={daysOfWeek} onSelect={(option: string) => setValues({ ...values, endDay: option })} />
            </FormItemStyles>
            <FormItemStyles>
              <Button color={ButtonColor.primary} disabled={!startDay || !endDay || !startTime || !endTime} onClick={updateSettings}>
                {loading ? (
                  <Flex>
                    <Spinner size={20} />
                    Wysyłanie...
                  </Flex>
                ) : (
                  "Ustaw"
                )}
              </Button>
            </FormItemStyles>
          </FormStyles>
        </ChatSettingsData>
      </Container>
    </Layout>
  );
};

export default transition(EditSettings);
