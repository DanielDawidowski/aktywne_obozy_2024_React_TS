import styled from "styled-components";

export const DividerStyles = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  span {
    background-color: ${(props) => props.theme.orange};
  }
`;

export const DividerLeftStyles = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: ${(props) => props.theme.size1};

  span {
    width: 70%;
    height: 2px;
    border-radius: 18px 0 0 18px;
  }
`;

export const DividerCenterStyles = styled.div`
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  span {
    width: 15px;
    height: 15px;
    border-radius: 50%;
  }
`;

export const DividerRightStyles = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: ${(props) => props.theme.size1};
  span {
    width: 70%;
    height: 2px;
    border-radius: 0 18px 18px 0;
  }
`;
