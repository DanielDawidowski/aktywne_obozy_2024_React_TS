import React from "react";
import type { FC, ReactElement } from "react";
import { BiSolidCookie } from "react-icons/bi";
import { Utils } from "../../utils/utils.service";
import Button from "../button/Button";
import { ButtonColor } from "../button/Button.interface";
import Drawer from "../drawer/Drawer";
import { DrawerPosition } from "../drawer/Drawer.interface";
import { Flex, Grid } from "../globalStyles/global.styles";
import { CookieStyles, CookieWrapper } from "./Cookie.styles";
import { useAppDispatch, useAppSelector } from "../../redux-toolkit/hooks";
import Modal from "../modal/Modal";
import { closeModal, toggleCookieModal } from "../../redux-toolkit/reducers/modal/modal.reducer";
import CookieContent from "./CookieContent";
import DotGrid from "../dots/Dots";

interface CookieContentProps {
  isCookieDrawerOpen: boolean;
  setIsCookieDrawerOpen: (isCookieDrawerOpen: boolean) => void;
}

const Cookie: FC<CookieContentProps> = ({ isCookieDrawerOpen, setIsCookieDrawerOpen }): ReactElement | null => {
  const { isCookieModalOpen } = useAppSelector((state) => state.modal);

  const dispatch = useAppDispatch();

  const openCookieModal = (): void => {
    console.log("cookieModal");
    dispatch(toggleCookieModal(true));
  };

  const closeModalClient = (): void => {
    dispatch(closeModal());
  };

  const handleAccept = (): void => {
    Utils.setCookie("cookie", "accepted", 365);
    setIsCookieDrawerOpen(false);
  };

  return (
    <CookieStyles>
      {isCookieDrawerOpen ? (
        <Drawer onClose={setIsCookieDrawerOpen} position={DrawerPosition.bottom}>
          <Grid>
            <CookieWrapper>
              <BiSolidCookie />
              <Flex $align="center" $justify="space-around" $direction="column">
                <h3>Polityka plików cookie</h3>
                <p>Ta strona używa plików cookie. Dowiedz się więcej o naszej polityce prywatności.</p>
              </Flex>
              <DotGrid columns={10} rows={5} />
              <Flex $align="center" $justify="space-around">
                <Button color={ButtonColor.primary} onClick={openCookieModal}>
                  Szczegóły
                </Button>
                <Button color={ButtonColor.chat} onClick={handleAccept}>
                  Zgadzam się
                </Button>
              </Flex>
            </CookieWrapper>
          </Grid>
        </Drawer>
      ) : null}
      {isCookieModalOpen ? (
        <Modal isOpen={isCookieModalOpen} onClose={closeModalClient}>
          <CookieContent />
        </Modal>
      ) : null}
    </CookieStyles>
  );
};

export default Cookie;
