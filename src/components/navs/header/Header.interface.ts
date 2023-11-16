export default interface IHeader {
  toggleMenu: boolean;
  setToggleMenu: (toggleMenu: boolean) => void;
  close?: boolean;
}
