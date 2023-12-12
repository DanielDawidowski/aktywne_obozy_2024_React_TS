import React, { ReactElement } from "react";
import type { FC } from "react";
import { CookieContentStyles } from "./Cookie.styles";
import { Flex } from "../globalStyles/global.styles";
import Logo from "../logo/Logo";

const CookieContent: FC = (): ReactElement => {
  return (
    <CookieContentStyles>
      <h2>Polityka Prywatności</h2>
      <br />
      <p>
        Niniejsza Polityka Prywatności określa zasady gromadzenia, przetwarzania i ochrony danych osobowych Użytkowników korzystających z naszej
        strony internetowej, która zajmuje się organizacją kolonii dla dzieci.
      </p>
      <br />
      <h3>
        <b>1. Rodzaje zbieranych danych osobowych:</b>
      </h3>
      <p>Podczas korzystania z naszej strony internetowej, Użytkownik może zostać poproszony o podanie następujących danych osobowych:</p>
      <br />
      <h5>- Imię i nazwisko dziecka,</h5>
      <h5>- Dane kontaktowe rodzica/opiekuna prawnego (adres e-mail, numer telefonu),</h5>
      <h5>- Data urodzenia dziecka,</h5>
      <h5>- Treści przekazywane w trakcie rozmów w czacie.</h5>
      <br />
      <h3>
        <b>2. Cel zbierania danych:</b>
      </h3>
      <p>
        Dane osobowe są zbierane w celu umożliwienia rejestracji dziecka na kolonie, zapewnienia bezpieczeństwa uczestnictwa oraz ułatwienia
        komunikacji z rodzicami/opiekunami. Treści przekazywane w czacie są przechowywane jedynie w celu obsługi bieżącej komunikacji i są usuwane po
        zakończeniu rozmowy przez administratora strony.
      </p>
      <br />
      <h3>
        <b>3. Podstawa prawna przetwarzania danych:</b>
      </h3>
      <p>
        Przetwarzanie danych osobowych odbywa się na podstawie zgody rodzica/opiekuna prawnego, a także w celu wykonania umowy, której strona jest
        uczestnictwo dziecka w naszych koloniach.
      </p>
      <br />
      <h3>
        <b>4. Okres przechowywania danych:</b>
      </h3>
      <p>Dane osobowe przechowywane są do momentu zakończenia kolonii. Treści przekazywane w czacie są usuwane po zakończeniu rozmowy.</p>
      <br />
      <h3>
        <b>5. Komunikacja poprzez chat:</b>
      </h3>
      <p>
        Treści rozmów w czacie są przechowywane jedynie w trakcie bieżącej komunikacji i są usuwane po zakończeniu rozmowy. Administrator strony nie
        przechowuje ich dłużej niż to niezbędne.
      </p>
      <br />
      <h3>
        <b>6. Prawa Użytkowników:</b>
      </h3>
      <p>
        Każdy rodzic/opiekun prawnego ma prawo dostępu do danych swojego dziecka, ich poprawiania, usunięcia, ograniczenia przetwarzania, przenoszenia
        danych, a także wniesienia sprzeciwu wobec przetwarzania danych osobowych.
      </p>
      <br />
      <h3>
        <b>7. Bezpieczeństwo danych:</b>
      </h3>
      <p>
        Zapewniamy odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych przed nieuprawnionym dostępem, utratą, uszkodzeniem
        lub zniszczeniem.
      </p>
      <br />
      <h3>
        <b>Kontakt:</b>
      </h3>
      <p>W sprawach związanych z ochroną danych osobowych można skontaktować się z nami pod adresem [adres e-mail] lub [numer telefonu].</p>
      <br />
      <p>
        Niniejsza Polityka Prywatności może ulec zmianie. Aktualna wersja zawsze będzie dostępna na naszej stronie internetowej. O wszelkich istotnych
        zmianach będziemy informować naszych klientów.
      </p>
      <br />
      <h4>
        Data ostatniej aktualizacji: <b>24.12.2023</b>
      </h4>
      <br />
      <Flex $align="center" $justify="space-around">
        <Logo width="45px" height="65px" />
        <Flex $align="flex-start" $justify="flex-start" $direction="column">
          <h4> Stowarzyszenie Aktywne Obozy</h4> <br />
          <h4> tel: +48602423775</h4> <br />
          <h4> email: aktywneobozy@gmail.com</h4>
        </Flex>
      </Flex>
    </CookieContentStyles>
  );
};

export default CookieContent;
