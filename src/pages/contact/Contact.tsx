import React, { ReactElement, useState } from "react";
import type { FC, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";
import { IoIosArrowDropupCircle } from "react-icons/io";
import { motion } from "framer-motion";
import Layout from "../../components/layout/Layout";
import {
  ContactContainer,
  ContactInfo,
  ContactInner,
  ContactLeft,
  ContactLeftInner,
  ContactOuter,
  ContactRight,
  ContactRightInner,
  ContactStyles
} from "./Contact.styles";
import { Container, Flex, Grid, TextDecoration } from "../../components/globalStyles/global.styles";
import { useAppDispatch } from "../../redux-toolkit/hooks";
import TextArea from "../../components/textarea/Textarea";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import { IEmail } from "../../interfaces/email/Email.interface";
import { emailService } from "../../services/api/email/email.service";
import { Utils } from "../../utils/utils.service";
import { INotificationType } from "../../interfaces/notification/notification.interface";
import { ButtonColor } from "../../components/button/Button.interface";
import { FormItemStyles, FormStyles } from "../../components/form/Form.styles";
import Spinner from "../../components/spinner/Spinner";
import transition from "../../utils/transition";
import { ValidationError } from "../../interfaces/error/Error.interface";
import DotGrid from "../../components/dots/Dots";

interface IQuestion {
  id: string;
  question: string;
  answer: string;
}

const questionArr: IQuestion[] = [
  {
    id: "0",
    question: "Czy atrakcje sa wliczone w cene?",
    answer:
      "Na kolonii zapewniamy pełen pakiet atrakcji, a ceny obejmują wszystkie dostępne rozrywki i aktywności. Oznacza to, że każde dziecko biorące udział w kolonii ma gwarancję korzystania z różnorodnych atrakcji, które zostały zaplanowane na czas pobytu. Bez dodatkowych opłat czy ukrytych kosztów, rodzice mogą być spokojni, że ich dzieci będą miały dostęp do pełnego programu rozrywkowego."
  },
  {
    id: "1",
    question: "Skad ruszamy?",
    answer:
      "Każdy wyjazd zaczynamy od stadionu miejskiego w Ełku. W przypadku dużego zainteresowania lub konieczności dostosowania logistyki, istnieje możliwość, że miejsce wyjazdu zostanie dostosowane do potrzeb grupy. Jednak niezależnie od ewentualnych zmian, zawsze zapewniamy jasne informacje i instrukcje uczestnikom oraz ich rodzicom "
  },
  {
    id: "2",
    question: "Co zabieramy ze soba?",
    answer: " Przesyłamy listę niezbędnych rzeczy do spakowania, obejmującą odzież, obuwie, środki higieniczne i inne potrzebne przedmioty."
  },
  {
    id: "3",
    question: "Jakie są kwestie bezpieczeństwa?",
    answer:
      "Bezpieczeństwo uczestników jest dla nas priorytetem, dlatego wprowadziliśmy szczegółowe procedury, aby zapewnić, że każde dziecko będzie bezpieczne i zabezpieczone podczas pobytu na kolonii."
  },
  {
    id: "4",
    question: "Jakie doświadczenie ma personel organizatorów kolonii?",
    answer:
      "Nasz personel składa się z doświadczonych pedagogów, którzy posiadają odpowiednie kwalifikacje i przeszli szkolenie z zakresu opieki nad dziećmi, pierwszej pomocy oraz procedur bezpieczeństwa"
  },
  {
    id: "5",
    question: "Jakie są standardy bezpieczeństwa w miejscu zakwaterowania?",
    answer: "Zapewniamy bezpieczne i higieniczne warunki zakwaterowania, regularnie sprawdzane pod kątem zgodności z normami bezpieczeństwa."
  },
  {
    id: "6",
    question: "Jak często są aktualizowane rodzice na temat postępów dzieci?",
    answer:
      "Regularnie informujemy rodziców o postępach i wydarzeniach na kolonii poprzez wiadomości, rozmowy telefoniczne lub zdjęcia udostępniane przez media społecznościowe."
  },
  {
    id: "7",
    question: "Jakie są plany na przypadki nagłych problemów zdrowotnych dziecka?",
    answer:
      "Posiadamy dobrze wyposażoną apteczkę pierwszej pomocy, a nasi pracownicy są przeszkoleni w udzielaniu pomocy w nagłych przypadkach zdrowotnych. Dostępne są również lokalne placówki medyczne."
  },
  {
    id: "8",
    question: "Jakie są opcje żywieniowe dla dzieci o różnych potrzebach?",
    answer: "Dostosowujemy posiłki do różnych wymagań żywieniowych uczestników, uwzględniając alergie i preferencje dietetyczne."
  },
  {
    id: "9",
    question: "Jakie są kryteria wyboru miejsc wycieczek i atrakcji?",
    answer: "Wybieramy miejsca i atrakcje uwzględniając atrakcyjność, edukacyjność i bezpieczeństwo, aby zapewnić pełne doświadczenie."
  },
  {
    id: "10",
    question: "Jakie są procedury przyjmowania i weryfikacji zgłoszeń uczestników?",
    answer:
      "Przyjmujemy zgłoszenia zgodnie z ustalonym harmonogramem, a każde zgłoszenie jest starannie weryfikowane w celu zapewnienia zgodności z wymaganiami."
  },
  {
    id: "11",
    question: "Czy istnieje plan awaryjny w przypadku złej pogody?",
    answer: "Tak, posiadamy elastyczny program i plan awaryjny, aby dostosować się do zmiennej pogody i innych nieprzewidzianych okoliczności."
  },
  {
    id: "12",
    question: "Jakie są zasady komunikacji między rodzicami a personelem kolonii?",
    answer: "Zapewniamy jasne zasady komunikacji, obejmujące regularne aktualizacje oraz dostępność dla rodziców w przypadku pilnych sytuacji."
  }
];

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
  const [toggle, setToggle] = useState<string>("");

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

  const handleAccordionClick = (index: string): void => {
    if (toggle === index) {
      setToggle("");
    } else {
      setToggle(index);
      setTimeout(() => {
        Utils.scrollToElement(index, 200);
      }, 500);
    }
  };
  return (
    <Layout>
      <ContactStyles>
        <Container>
          <ContactContainer>
            <ContactLeft>
              <ContactLeftInner>
                <ContactOuter>
                  <ContactInner>
                    <ContactInfo>
                      <DotGrid rows={5} columns={10} />
                      <Grid>
                        <Flex $align="flex-start" $justify="center" $direction="column">
                          <h4>
                            <b>
                              <TextDecoration>Dane kontaktowe</TextDecoration>
                            </b>
                          </h4>
                          <h4>Marcin +48 602 423 775</h4>
                          <h4>aktywneobozy@gmail.com</h4>
                        </Flex>
                      </Grid>
                    </ContactInfo>
                  </ContactInner>
                </ContactOuter>

                <ContactOuter>
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
                </ContactOuter>
              </ContactLeftInner>
            </ContactLeft>

            <ContactRight>
              <Grid>
                <h3>Najczęściej zadawane pytania</h3>
              </Grid>
              <ContactRightInner>
                <ContactOuter>
                  {questionArr.map((item: IQuestion) => (
                    <ContactInner key={item.id} id={item.id} $bg={item.id === toggle}>
                      <Flex $align="center" $justify="flex-start">
                        <motion.div
                          initial={{ rotate: 0 }}
                          animate={{ rotate: toggle === item.id ? 180 : 0, transition: { duration: 0.5 } }}
                          exit={{ rotate: 0 }}
                        >
                          <IoIosArrowDropupCircle />
                        </motion.div>
                        <h4 onClick={() => handleAccordionClick(item.id)}>{item.question}</h4>
                      </Flex>
                      {toggle === item.id && (
                        <Grid>
                          <DotGrid rows={3} columns={15} />
                          <motion.p initial={{ y: -10 }} animate={{ y: 0, transition: { duration: 0.5 } }} exit={{ y: -10 }}>
                            {item.answer}
                          </motion.p>
                        </Grid>
                      )}
                    </ContactInner>
                  ))}
                </ContactOuter>
              </ContactRightInner>
            </ContactRight>
          </ContactContainer>
        </Container>
      </ContactStyles>
    </Layout>
  );
};

export default transition(Contact);
