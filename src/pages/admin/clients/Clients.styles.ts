import styled from "styled-components";
import { InputContainer, InputField, LableStyles } from "../../../components/input/Input.styles";
import { DownloadPDFButton } from "./ClientsListPDF";

export const ClientsFilters = styled.div`
  display: grid;
  border: 1px solid ${(props) => props.theme.text};
  margin: ${(props) => props.theme.size3} ${(props) => props.theme.size1};
  border-radius: 8px;
  @media (min-width: ${(props) => props.theme.breakpoint_small}) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  ${InputContainer} {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    margin: ${(props) => props.theme.size2};
    @media (min-width: ${(props) => props.theme.breakpoint_small}) {
      height: 50px;
    }
    input {
      box-shadow: none;
      &:checked {
        box-shadow: none;
      }
      &:focus {
        border-color: none;
        box-shadow: none;
        color: ${(props) => props.theme.primary_dark};
      }
    }
    ${LableStyles} {
      color: ${(props) => props.theme.secondaryColor};
    }
  }
`;

export const ClientsList = styled.ul`
  border: 0.5px solid ${(props) => props.theme.text};
  background: ${(props) => props.theme.primaryColor};

  border-radius: 8px;
  padding: ${(props) => props.theme.size2};
  margin: ${(props) => props.theme.size1};
`;

export const ClientItem = styled.li`
  background: ${(props) => props.theme.fifthColor};
  padding: ${(props) => props.theme.size1};
  margin: ${(props) => props.theme.size1} 0;
  border: 0.5px solid ${(props) => props.theme.text};
  border-radius: 8px;
  display: grid;
  grid-template-areas: "name event icons";
  grid-template-columns: 1fr 1fr 1fr;
`;

export const ClientActionsBtn = styled.div`
  height: 40px;
  margin: ${(props) => props.theme.size1};
  display: grid;
  grid-template-areas: "delete pdf";
`;

export const CheckBtn = styled.div`
  grid-area: delete;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  input {
    margin-right: ${(props) => props.theme.size1};
  }
`;

export const PDFBtn = styled.div`
  grid-area: pdf;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    width: 30px;
    height: 30px;
    border: 1px solid ${(props) => props.theme.text};
    border-radius: 4px;
    cursor: pointer;
    margin-right: ${(props) => props.theme.size4};
  }
`;

export const ClientItemIcons = styled.div`
  grid-area: icons;
  svg {
    width: 25px;
    height: 25px;
    margin-right: ${(props) => props.theme.size3};
    cursor: pointer;
  }
`;

export const ClientName = styled.div`
  grid-area: name;
  display: flex;
  input {
    margin-right: ${(props) => props.theme.size1};
  }
`;

export const ClientEvent = styled.div`
  grid-area: event;
`;
