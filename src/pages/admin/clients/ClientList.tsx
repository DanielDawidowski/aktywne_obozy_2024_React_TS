import React, { useState, useCallback, ReactElement, useMemo, useEffect } from "react";
import type { FC, ChangeEvent } from "react";
import axios from "axios";
import { Dispatch } from "@reduxjs/toolkit";
import { AiOutlineEdit } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { IClient } from "../../../interfaces/client/client.interface";
import Layout from "../../../components/layout/Layout";
import useEffectOnce from "../../../hooks/useEffectOnce";
import { clientService } from "../../../services/api/clients/clients.service";
import {
  ClientsList,
  ClientItem,
  ClientsFilters,
  ClientItemIcons,
  ClientName,
  ClientEvent,
  ClientActionsBtn,
  PDFBtn,
  CheckBtn
} from "./Clients.styles";
import { Container, Flex, Grid } from "../../../components/globalStyles/global.styles";
import Input from "../../../components/input/Input";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { ValidationError } from "../../../interfaces/error/Error.interface";
import { DownloadPDFButton } from "./ClientsListPDF";
import Spinner from "../../../components/spinner/Spinner";
import { Loading } from "../../events/Events.styles";

const Clients: FC = (): ReactElement => {
  const [clients, setClients] = useState<IClient[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [ids, setIds] = useState<string[]>([]);

  const dispatch: Dispatch = useAppDispatch();

  const getClients = useCallback(async () => {
    setLoading(true);
    try {
      const response = await clientService.getAllClients(1);
      setClients(response.data.clients);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

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

  const deleteClients = async (): Promise<void> => {
    const result = confirm("Czy na pewno chcesz usunąć?");
    if (result) {
      try {
        const response = await clientService.deleteClients(ids);
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

  const getEvents = (c: IClient[]): void => {
    const eventNames = c.map((event) => event.eventName);
    const uniqueNames = new Set(eventNames);
    const uniqueNamesArray = Array.from(uniqueNames);
    setEvents(uniqueNamesArray);
  };

  useEffectOnce(() => {
    getClients();
  });

  useEffect(() => {
    if (!clients) null;
    getEvents(clients);
  }, [clients]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { checked, value } = e.target;
    if (checked) {
      setFilters([...filters, value]);
    } else {
      setFilters(filters.filter((filter) => filter !== value));
    }
  };

  const handleCheckboxChange = (clientId: string): void => {
    setIds((prevClients) => {
      if (prevClients.includes(clientId)) {
        return prevClients.filter((id) => id !== clientId);
      } else {
        return [...prevClients, clientId];
      }
    });
  };

  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>): void => {
    const { checked } = e.target;
    const allClientIds = clients.map((client) => client._id);
    if (checked) {
      setIds(allClientIds as string[]);
    } else {
      setIds([]);
    }
  };

  const filteredClients = useMemo(() => {
    return clients.filter((client: IClient) => {
      return filters.some((filter) => client.eventName.includes(filter));
    });
  }, [clients, filters]);

  return (
    <Layout chat={false}>
      {!loading ? (
        <Container $small>
          <Loading>
            <Grid>
              <Spinner />
            </Grid>
          </Loading>
        </Container>
      ) : (
        <Container $small>
          <ClientsFilters>
            {events.map((event: string, i: number) => (
              <Input key={i} name={event} type="checkbox" value={event} labelText={event} handleChange={handleChange} />
            ))}
          </ClientsFilters>
          <ClientActionsBtn>
            <CheckBtn>
              <input type="checkbox" onChange={handleCheckAll} />
              <h5>zaznacz wszystko</h5>
            </CheckBtn>
            <PDFBtn>
              {ids.length > 0 ? <MdDeleteForever style={{ fill: "red" }} onClick={() => deleteClients()} /> : null}
              <DownloadPDFButton clients={clients} filters={filters} />
            </PDFBtn>
          </ClientActionsBtn>

          {loading && filteredClients.length > 0 ? (
            <ClientsList>
              {filteredClients.map((client: IClient) => (
                <ClientItem key={client._id}>
                  <ClientName>
                    <input
                      name={client.name}
                      value={client._id}
                      type="checkbox"
                      onChange={() => handleCheckboxChange(client._id as string)}
                      checked={ids.includes(client._id as string)}
                    />
                    <h4>{client.name}</h4>
                  </ClientName>
                  <ClientEvent>
                    <Grid>
                      <h5>{client.eventName}</h5>
                    </Grid>
                  </ClientEvent>
                  <ClientItemIcons>
                    <Flex $align="center" $justify="flex-end">
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
                </ClientItem>
              ))}
            </ClientsList>
          ) : (
            <ClientsList>
              {clients.map((client: IClient) => (
                <ClientItem key={client._id}>
                  <ClientName>
                    <input
                      name={client.name}
                      value={client._id}
                      type="checkbox"
                      onChange={() => handleCheckboxChange(client._id as string)}
                      checked={ids.includes(client._id as string)}
                    />
                    <h4>{client.name}</h4>
                  </ClientName>
                  <ClientEvent>
                    <Grid>
                      <h5>{client.eventName}</h5>
                    </Grid>
                  </ClientEvent>
                  <ClientItemIcons>
                    <Flex $align="center" $justify="flex-end">
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
                </ClientItem>
              ))}
            </ClientsList>
          )}
        </Container>
      )}
    </Layout>
  );
};

export default Clients;
