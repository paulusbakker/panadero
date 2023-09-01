import styled from "styled-components";

export const DottedLine = styled.hr`
  border-top: 1px dotted ${(props) => props.theme.colors.textColor};
  margin-bottom: 16px;
`;

