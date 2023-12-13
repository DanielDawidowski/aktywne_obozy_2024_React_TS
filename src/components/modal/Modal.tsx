import React, { useRef, useEffect } from "react";
import type { FC, ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { CloseModalStyles, ModalContent, ModalOverlay, ModalWrapper } from "./Modal.styles";
import { Flex } from "../globalStyles/global.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <ModalWrapper>
            <ModalContent ref={modalContentRef} initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -50, opacity: 0 }}>
              <Flex $align="flex-end" $justify="flex-end">
                <CloseModalStyles>
                  <IoIosCloseCircleOutline onClick={onClose} />
                </CloseModalStyles>
              </Flex>
              {children}
            </ModalContent>
          </ModalWrapper>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
