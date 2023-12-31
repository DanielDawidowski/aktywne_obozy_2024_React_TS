import React, { useCallback, useState, ReactElement } from "react";
import type { FC, FormEvent } from "react";
import { useParams } from "react-router-dom";
import { LuPencil } from "react-icons/lu";
import axios from "axios";
import Energylandia from "../../assets/Images/energylandia.jpg";
import PeopleImg from "../../assets/Images/events/people.png";
import { closeModal, openModal } from "../../redux-toolkit/reducers/modal/modal.reducer";
import Layout from "../../components/layout/Layout";
import { eventService } from "../../services/api/events/events.service";
import { IEvent } from "../../interfaces/event/event.interface";
import { Utils } from "../../utils/utils.service";
import { INotificationType } from "../../interfaces/notification/notification.interface";
import { clientService } from "../../services/api/clients/clients.service";
import useEffectOnce from "../../hooks/useEffectOnce";
import Image from "../../components/image/Image";
import Information from "../../components/information/Information";
import Divider from "../../components/divider/Divider";
import RandomIcons from "../../components/random-icons/RandomIcons";
import PeopleSVG from "../../assets/SVG/people";
import InsurenceSVG from "../../assets/SVG/insurence";
import HotelSVG from "../../assets/SVG/hotel";
import TransportSVG from "../../assets/SVG/transport";
import transition from "../../utils/transition";
import Modal from "../../components/modal/Modal";
import { useAppSelector, useAppDispatch } from "../../redux-toolkit/hooks";
import { IClient } from "../../interfaces/client/client.interface";
import ClientForm from "../../components/form/client/Client.form";
import {
  EventInner,
  EventLeftAttraction,
  EventLeftElement,
  EventLeftHeader,
  EventLeft,
  EventRightInner,
  EventRight,
  EventStyles,
  LeftCorner,
  RightCorner,
  SignUp
} from "./Event.styles";
import { Container, Dot, Flex, Grid, TextDecoration } from "../../components/globalStyles/global.styles";
import EventInfo from "./EventInfo";
import { ValidationError } from "../../interfaces/error/Error.interface";

// import Dots from "@assets/SVG/Dots";

const initialState: IClient = {
  eventId: "",
  eventName: "",
  name: "",
  email: "",
  tel: "",
  birthDate: "",
  price: ""
};

const Event: FC = (): ReactElement => {
  const [values, setValues] = useState<IClient>(initialState);
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [checked, setChecked] = useState<string>("");

  const { isModalOpen } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const { eventId } = useParams();
  const getId = eventId as string;

  const getEvent = useCallback(async () => {
    try {
      const response = await eventService.getEvent(getId);
      setEvent(response.data.event);
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
  }, [getId, dispatch, errorMessage]);

  const createClient = async (e: FormEvent): Promise<void | undefined> => {
    e.preventDefault();
    setLoading(true);
    values.eventId = getId;
    values.eventName = event.name;
    try {
      const response = await clientService.createClient(values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setChecked("");
      Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
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

  const openModalClient = (): void => {
    dispatch(openModal());
  };

  const closeModalClient = (): void => {
    dispatch(closeModal());
  };

  useEffectOnce(() => {
    getEvent();
  });

  return (
    <Layout chat={false}>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModalClient}>
          <EventInfo event={event} openModalClient={openModalClient} checked={checked} />
          <ClientForm
            event={event}
            values={values}
            setValues={setValues}
            setChecked={setChecked}
            checked={checked}
            createClient={createClient}
            loading={loading}
            hasError={hasError}
          />
        </Modal>
      )}
      <SignUp
        animate={{
          borderRadius: 100,
          height: 70,
          width: 70
        }}
        onClick={openModalClient}
        style={{
          bottom: 20,
          left: 20
        }}
      >
        <LuPencil />
      </SignUp>
      <EventStyles>
        <Container>
          {/* <GoBackButton /> */}
          <EventInner>
            <EventLeft>
              <EventLeftHeader>
                <LeftCorner />
                {event.image ? <Image src={event.image as string} alt="event" /> : null}
                <RightCorner />
              </EventLeftHeader>

              <Grid>
                <RandomIcons icons={6} flex />
                <Information>
                  <h2>Organizator zapewnia</h2>
                  <Divider />
                </Information>
              </Grid>
              <EventLeftElement>
                {event.energyland && (
                  <>
                    <LeftCorner />
                    <Image src={Energylandia} alt="Energylandia" />
                    <RightCorner />
                    <Grid>
                      <Information>
                        <h3>Całodniowa wycieczka do Energylandii</h3>
                        <Divider />
                      </Information>
                    </Grid>
                  </>
                )}
              </EventLeftElement>
              <EventLeftElement $bg>
                <LeftCorner />
                <RightCorner />
                <Grid>
                  <h3>
                    <b>
                      <TextDecoration> Wycieczki</TextDecoration> krajoznawczo turystyczne
                    </b>
                  </h3>
                </Grid>
                <EventLeftAttraction>
                  {event.attractions &&
                    event.attractions.map((attraction, index) => (
                      <li key={index}>
                        <Flex $align="center" $justify="flex-start">
                          <Dot />
                          <h4>{attraction}</h4>
                        </Flex>
                      </li>
                    ))}
                  <li>
                    <Image src={PeopleImg} alt="people" />
                  </li>
                </EventLeftAttraction>
                <Divider />
                {event.extraAttractions && event.extraAttractions.length > 0 ? (
                  <>
                    <Grid>
                      <h3>
                        <b>
                          <TextDecoration>Zajęcia</TextDecoration> poza programem
                        </b>
                      </h3>
                    </Grid>
                    <EventLeftAttraction>
                      {event.extraAttractions &&
                        event.extraAttractions.map((attraction, index) => (
                          <li key={index}>
                            <Flex $align="center" $justify="flex-start">
                              <Dot />
                              <h4>{attraction}</h4>
                            </Flex>
                          </li>
                        ))}
                    </EventLeftAttraction>
                    <Grid>
                      <RandomIcons icons={4} flex />
                    </Grid>
                  </>
                ) : null}
              </EventLeftElement>
              <EventLeftElement $bg>
                <LeftCorner />
                <RightCorner />
                <Grid>
                  <ul>
                    <li>
                      <Flex $align="center" $justify="flex-start">
                        <PeopleSVG />
                        <h4>przez cały pobyt uczestnicy są pod opieką wykwalifikowanej kadry pedagogicznej</h4>
                      </Flex>
                    </li>
                    <li>
                      <Flex $align="center" $justify="flex-start">
                        <InsurenceSVG />
                        <h4>opiekę medyczną i ubezpieczenie NNW</h4>
                      </Flex>
                    </li>
                    <li>
                      <Flex $align="center" $justify="flex-start">
                        <HotelSVG />
                        <h4>nocleg i wyżywienie</h4>
                      </Flex>
                    </li>
                    <li>
                      <Flex $align="center" $justify="flex-start">
                        <TransportSVG />
                        <h4>transport</h4>
                      </Flex>
                    </li>
                  </ul>
                  <Divider />
                  <Grid>
                    <h2>
                      <b>
                        <TextDecoration>Wszystkie</TextDecoration> zakładane atrakcje wliczone są w cenę kolonii
                      </b>
                    </h2>
                  </Grid>
                </Grid>
              </EventLeftElement>

              <Grid>
                <RandomIcons icons={12} flex />
              </Grid>
            </EventLeft>

            <EventRight>
              <EventRightInner>
                <EventInfo event={event} openModalClient={openModalClient} showBtn checked={checked} />
              </EventRightInner>
            </EventRight>
          </EventInner>
        </Container>
      </EventStyles>
    </Layout>
  );
};

export default transition(Event);
