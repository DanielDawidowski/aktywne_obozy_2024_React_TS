import React, { useCallback, useState, ReactElement } from "react";
import type { FC, FormEvent, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Energylandia from "../../assets/Images/energylandia.jpg";

// import ClientForm from "@pages/event/ClientForm/ClientForm";
import Layout from "../../components/layout/Layout";
import { eventService } from "../../services/api/events/events.service";
import { IEvent } from "../../interfaces/event/event.interface";
import { Utils } from "../../utils/utils.service";
import { INotificationType } from "../../interfaces/notification/notification.interface";
import { clientService } from "../../services/api/clients/clients.service";
import { GoBackButton } from "../../components/navs/go-back-button/goBackButton";
import useEffectOnce from "../../hooks/useEffectOnce";
import Image from "../../components/image/Image";
import Information from "../../components/information/Information";
import { EventUtils } from "../../utils/event-utils.service";
import Divider from "../../components/divider/Divider";
import RandomIcons from "../../components/random-icons/RandomIcons";
import PeopleSVG from "../../assets/SVG/people";
import InsurenceSVG from "../../assets/SVG/insurence";
import HotelSVG from "../../assets/SVG/hotel";
import TransportSVG from "../../assets/SVG/transport";
import transition from "../../utils/transition";

// import Dots from "@assets/SVG/Dots";

const initialState = {
  eventId: "",
  eventName: "",
  name: "",
  email: "",
  tel: "",
  birthDate: "",
  price: ""
};

const Event: FC = (): ReactElement => {
  const [values, setValues] = useState(initialState);
  const [event, setEvent] = useState<IEvent>({} as IEvent);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checked, setChecked] = useState("");
  const dispatch = useDispatch();

  const { eventId } = useParams();
  const getId: string = eventId as string;

  const { eventType, address } = event;

  const getEvent = useCallback(async () => {
    try {
      const response = await eventService.getEvent(getId);
      setEvent(response.data.event);
      console.log("response", response.data.event);
    } catch (error) {
      console.log("error", error);
    }
  }, [getId]);

  const createClient = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    values.eventId = getId;
    values.eventName = event.name;
    try {
      const response = await clientService.createClient(values);
      setLoading(false);
      setHasError(false);
      setValues(initialState);
      setChecked("");
      Utils.dispatchNotification(response?.data?.message as string, INotificationType.SUCCESS, dispatch);
    } catch (error: any) {
      setLoading(false);
      setHasError(true);
      setErrorMessage(error?.response?.data.message);
      Utils.dispatchNotification(errorMessage, INotificationType.ERROR, dispatch);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.type === "checkbox") {
      setChecked(e.target.name);
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, " ---- ", e.target.value);
    }
  };

  useEffectOnce(() => {
    getEvent();
  });

  return (
    <Layout>
      <section className="event container">
        <div className="event__back">
          <GoBackButton />
        </div>

        <div className="event__body" style={{ background: EventUtils.showEventColor(event.eventType) }}>
          <div className="event__body--header">
            <h1>{event.name}</h1>
            <Image src={event.image as string} alt="event" />
            <div className="event__body--title">
              <Information location>
                {/* <div className="event__body--address">{EventUtils.showAddress(address)}</div> */}
              </Information>
            </div>
          </div>

          <div className="event__body--icons">
            <RandomIcons />
          </div>
          <div className="event__body--info">
            <Information>
              <h2>Organizator zapewnia</h2>
              <Divider />
            </Information>
          </div>
          {event.energyland && (
            <div className="event__body--energyland">
              <Image src={Energylandia} alt="Energylandia" />
              <div className="event__body--energyland--info">
                <Information location>
                  <h3>Całodniowa wycieczka do Energylandii</h3>
                  <a href="https://energylandia.pl/">energylandia.pl</a>
                  <Divider />
                </Information>
              </div>
            </div>
          )}
          <div className="event__body--attractions">
            <div className="event__body--attractions--wrapper">
              {/* <Dots color="#f7b124" /> */}
              <h3>
                Wycieczki krajoznawczo <span className="text__decoration">turystyczne</span>
              </h3>
              <ul className="event__body--attractions--list">
                {event.attractions &&
                  event.attractions.map((attraction, index) => (
                    <li key={index}>
                      <div className="dot"></div>
                      <h4>{attraction}</h4>
                    </li>
                  ))}
              </ul>
            </div>

            <Divider />
            <h3>
              <span className="text__decoration">Zajęcia</span> poza programem
            </h3>
            <div className="event__body--attractions--free">
              <div className="event__body--attractions--left">
                <RandomIcons />
              </div>
              <ul className="event__body--attractions--center">
                {event.extraAttractions &&
                  event.extraAttractions.map((attraction, index) => (
                    <li key={index}>
                      <div className="dot"></div>
                      <h4>{attraction}</h4>
                    </li>
                  ))}
              </ul>
              <div className="event__body--attractions--right">
                <RandomIcons />
              </div>
            </div>
          </div>
          <div className="event__body--assured">
            <div className="event__body--assured--wrapper">
              <ul className="event__body--assured--list">
                <li>
                  <PeopleSVG />
                  <h4>przez cały pobyt uczestnicy są pod opieką wykwalifikowanej kadry pedagogicznej</h4>
                </li>
                <li>
                  <InsurenceSVG />
                  <h4>opiekę medyczną i ubezpieczenie NNW</h4>
                </li>
                <li>
                  <HotelSVG />
                  <h4>nocleg i wyzywienie</h4>
                </li>
                <li>
                  <TransportSVG />
                  <h4>transport</h4>
                </li>
              </ul>
              <Divider />
              <h3>Wszystkie zakładane atrakcje wliczone są w cenę kolonii.</h3>
            </div>
          </div>
          <div className="event__body--bon">
            <div className="event__body--bon--image"></div>
            <h3>Realizujemy bony turystyczne</h3>
            <Divider />
          </div>

          <div className="event__bottom--small">
            <RandomIcons />
          </div>
          <div className="event__bottom--big">
            <RandomIcons />
          </div>
        </div>
        {/* <ClientForm
          event={event}
          values={values}
          handleChange={handleChange}
          createClient={createClient}
          checked={checked}
          loading={loading}
          hasError={hasError}
        /> */}
      </section>
    </Layout>
  );
};

export default transition(Event);
