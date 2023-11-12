import React, { useEffect, ReactElement, useCallback, useState, useMemo } from "react";
import type { FC } from "react";
import type { Dispatch } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { eventService } from "../../../services/api/events/events.service";
import { useAppDispatch } from "../../../redux-toolkit/hooks";
import { Utils } from "../../../utils/utils.service";
import { INotificationType } from "../../../interfaces/notification/notification.interface";
import { IEvent } from "../../../interfaces/event/event.interface";
import { AdminEventListItemStyles, AdminEventListStyles, ButtonActionStyles } from "../Admin.styles";
import Layout from "../../../components/layout/Layout";
import transition from "../../../utils/transition";

const AdminEvents: FC = (): ReactElement => {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [currentPage] = useState(1);
  const dispatch: Dispatch = useAppDispatch();

  const getAllEvents = useCallback(async (): Promise<void> => {
    try {
      const response = await eventService.getAllEvents(currentPage);
      setEvents(response.data.events);
      // console.log("response", response.data.events);
    } catch (error) {
      console.log("error", error);
    }
  }, [currentPage]);

  const deleteEvent = async (eventId: string): Promise<void> => {
    const result = confirm("Czy na pewno chcesz usunąć?");
    if (result) {
      try {
        const response: AxiosResponse<IEvent> = await eventService.deleteEvent(eventId);
        Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
        // console.log("response", response);
        getAllEvents();
      } catch (error: any) {
        Utils.dispatchNotification(error?.response?.data.message, INotificationType.ERROR, dispatch);
      }
    }
  };

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  const sortedList = useMemo(() => {
    return events.sort((a, b) => a.name.localeCompare(b.name));
  }, [events]);

  return (
    <Layout>
      <AdminEventListStyles>
        {sortedList.map((event, index) => (
          <AdminEventListItemStyles key={index}>
            <h2>{event.name}</h2>
            <ButtonActionStyles>
              <Link to={`/admin/events/update/${event._id}`}>
                <AiOutlineEdit />
              </Link>
              <MdDeleteForever style={{ fill: "red" }} onClick={() => deleteEvent(event._id as string)} />
            </ButtonActionStyles>
          </AdminEventListItemStyles>
        ))}
      </AdminEventListStyles>
    </Layout>
  );
};

export default transition(AdminEvents);
