import React, { ReactElement } from "react";
import type { ChangeEvent, FC, FormEvent } from "react";
import PropTypes from "prop-types";
import { BsInfoSquare } from "react-icons/bs";
import Input from "../../input/Input";
import Button from "../../button/Button";
import { IEvent } from "../../../interfaces/event/event.interface";
import { ButtonColor } from "../../button/Button.interface";
import { Flex } from "../../globalStyles/global.styles";
import Spinner from "../../spinner/Spinner";
import { IClient } from "../../../interfaces/client/client.interface";
import { EventInfoStyles, FormItemStyles, FormStyles } from "../Form.styles";
import RadioInput from "../../radio/Radio";

interface ClientClientFormProps {
  event: IEvent;
  values: IClient;
  setValues: (values: IClient) => void;
  setChecked: (checked: string) => void;
  createClient: (e: FormEvent) => Promise<void | undefined>;
  checked: string;
  loading: boolean;
  hasError: boolean;
}

const ClientForm: FC<ClientClientFormProps> = (props): ReactElement => {
  const { event, values, setValues, setChecked, createClient, checked, loading, hasError } = props;
  const { name, email, tel, birthDate, price } = values;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ---- ", e.target.value);
  };

  const handleRadioChange = (value: string): void => {
    setChecked(value);
    setValues({ ...values, price: value === "price" ? event.price.toString() : event.discountPrice.toString() });
  };

  return (
    <FormStyles>
      <FormItemStyles>
        <Input
          id="name"
          name="name"
          type="text"
          value={name}
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
        <Input
          id="tel"
          name="tel"
          type="text"
          value={tel}
          labelText="Telefon"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
      </FormItemStyles>

      <FormItemStyles>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={birthDate}
          labelText="Data Urodzenia"
          placeholder="---"
          style={{ border: `${hasError ? "1px solid #fa9b8a" : ""}` }}
          handleChange={handleChange}
        />
      </FormItemStyles>

      <FormItemStyles>
        <RadioInput
          label={`${event.price} PLN - cena bez dofinansowania KRUS`}
          value="price"
          checked={checked === "price"}
          onChange={handleRadioChange}
        />
      </FormItemStyles>

      <FormItemStyles>
        <RadioInput
          label={`${event.discountPrice} PLN - cena z dofinansowaniem KRUS`}
          value="discountPrice"
          checked={checked === "discountPrice"}
          onChange={handleRadioChange}
        />
      </FormItemStyles>

      {checked === "discountPrice" && (
        <FormItemStyles>
          <EventInfoStyles
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: checked === "discountPrice" ? "100%" : 0, transition: { duration: 1.5 } }}
            exit={{ opacity: 0, height: 0 }}
          >
            <BsInfoSquare style={{ fill: "#f94144" }} />
            <p>
              Z wypoczynku letniego mogą skorzystać dzieci i młodzież z terenu województwa warmińsko- mazurskiego i podlaskiego urodzonych po 1
              stycznia 2007 r., których co najmniej jedno z rodziców lub prawnych opiekunów jest ubezpieczone w pełnym zakresie ( jednocześnie posiada
              ubezpieczenie emerytalną – rentowe oraz wypadkowe, chorobowe i macierzyńskie) lub pobiera rentę bądź emeryturę z Kasy Rolniczego
              Ubezpieczenia Społecznego.
            </p>
          </EventInfoStyles>
        </FormItemStyles>
      )}

      <FormItemStyles>
        <Button color={ButtonColor.primary} disabled={!name || !email || !tel || !birthDate || !price} onClick={createClient}>
          {loading ? (
            <Flex>
              <Spinner size={20} />
              Wysyłanie...
            </Flex>
          ) : (
            "Wyślij"
          )}
        </Button>
      </FormItemStyles>
    </FormStyles>
  );
};

ClientForm.propTypes = {
  createClient: PropTypes.func.isRequired,
  checked: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired
};

export default ClientForm;
