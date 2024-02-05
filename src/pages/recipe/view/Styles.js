import styled from "styled-components";
// no need for importing the theme as it received automatically

export const DottedListLine = styled.li`
  list-style-type: none; /* Removes the default list item marker */
  border-top: 1px dotted ${(props) => props.theme.colors.textColor};
  padding: 0; /* Adjust padding as needed */
  margin-bottom: 16px;
`;

export const ListItemHeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  margin-right: -7px;
  font-size: 25px;
  background-color: ${(props) =>
    !props.$isValid && props.theme.colors.faultyItem};
`;

export const UnorderedListStyled = styled.ul`
  box-shadow: ${(props) => props.theme.boxShadow.default};
  font-family: ${(props) => props.theme.fonts.secondary};
  margin: ${(props) => props.theme.margins.marginTop} 10px 8px 8px;
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.contentBackgroundColor};
`;

export const RecipeValidationListStyled = styled(UnorderedListStyled)`
  .calculator-symbol,
  .menu-symbol {
    color: ${(props) => (props.$isValid ? "inherit" : "gray")};
    opacity: ${(props) => (props.$isValid ? "1" : "0.5")};
  }
`;
