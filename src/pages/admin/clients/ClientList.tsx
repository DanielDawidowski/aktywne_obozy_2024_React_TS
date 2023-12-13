import React, { useState, useCallback, ReactElement, useMemo } from "react";
import type { FC, ChangeEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { IClient } from "../../../interfaces/client/client.interface";
import Layout from "../../../components/layout/Layout";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { clientService } from "../../../services/api/clients/clients.service";
import { ClientsList, ClientItem, ClientsFilters, ClientItemIcons } from "../Admin.styles";
import { eventService } from "../../../services/api/events/events.service";
import { IEvent } from "../../../interfaces/event/event.interface";
import { Container, Flex, Grid } from "../../../components/globalStyles/global.styles";
import Input from "../../../components/input/Input";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { ValidationError } from "../../../interfaces/error/Error.interface";
import { DownloadPDFButton } from "./ClientsListPDF";

const Clients: FC = (): ReactElement => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch: Dispatch = useAppDispatch();

  const getClients = useCallback(async () => {
    setLoading(true);
    try {
      const response: AxiosResponse = await clientService.getAllClients(1);
      setClients(response.data.clients);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const getAllEvents = useCallback(async () => {
    try {
      const response = await eventService.getAllEvents(1);
      setEvents(response.data.events);
      // console.log("response", response.data.events);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { checked, value } = e.target;
    if (checked) {
      setFilters([...filters, value]);
    } else {
      setFilters(filters.filter((filter) => filter !== value));
    }
  };

  const deleteClient = async (clientId: string): Promise<void> => {
    const result = confirm("Czy na pewno chcesz usunąć?");
    if (result) {
      try {
        const response = await clientService.deleteClient(clientId);
        Utils.dispatchNotification(response.data.message, INotificationType.SUCCESS, dispatch);
        getClients();
      } catch (error) {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.response) {
          setLoading(false);
          setErrorMessage(error?.response?.data.message as string);
          Utils.dispatchNotification(errorMessage, INotificationType.ERROR, dispatch);
        } else {
          console.error(error);
        }
      }
    }
  };

  useEffectOnce(() => {
    getClients();
    getAllEvents();
  });

  const filteredClients = useMemo(() => {
    return clients.filter((client: IClient) => {
      return filters.every((filter) => client.eventName.includes(filter));
    });
  }, [clients, filters]);

  return (
    <Layout chat={false}>
      <Container $small>
        <ClientsFilters>
          {events.map((event: IEvent, i: number) =>
            event.status === "active" ? (
              <Input key={i} name={event.name} type="checkbox" value={event.name} labelText={event.name} handleChange={handleChange} />
            ) : null
          )}
        </ClientsFilters>
        <Flex $align="center" $justify="center">
          <DownloadPDFButton clients={clients} filters={filters} />
        </Flex>
        {loading && filteredClients.length > 0 ? (
          <ClientsList>
            {filteredClients.map((client: IClient) => (
              <ClientItem key={client._id}>
                <Flex $align="center" $justify="space-between">
                  <h4>{client.name}</h4>
                  <h5>{client.eventName}</h5>
                  <ClientItemIcons>
                    <Flex $align="center" $justify="space-around">
                      <Link to={`/admin/client/${client._id}`}>
                        <Grid>
                          <AiOutlineEdit style={{ fill: "blue" }} />
                        </Grid>
                      </Link>
                      <Grid>
                        <MdDeleteForever style={{ fill: "red" }} onClick={() => deleteClient(client._id as string)} />
                      </Grid>
                    </Flex>
                  </ClientItemIcons>
                </Flex>
              </ClientItem>
            ))}
          </ClientsList>
        ) : (
          <Grid>
            <ClientsList>
              <h3>brak zgłoszeń</h3>
            </ClientsList>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default Clients;
