import styled from "styled-components";
import theme from "../../../../global_style & theme/Theme"; // theme needs to be imported because component is lays deeper

export const ContainerStyled = styled.span`
  // needed for alignment
  display: flex;
`;

export const ListItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.$isFaulty
      ? theme.colors.faultyItem
      : props.$isOrHasMissingInParent
      ? theme.colors.isOrHasMissing
      : "initial"};

  &:has(+ .isFaulty),
  &:has(+ .isOrHasMissingInParent) {
    border-bottom-width: 0px;
  }
`;

const FlexContainerStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const LeftAlignedFlexContainer = styled(FlexContainerStyled)``;

export const RightSpacedFlexContainer = styled(FlexContainerStyled)`
  justify-content: space-between;
  width: 150px;
`;

export const SpanStyled = styled.span`
  width: 84px;
  display: flex;
  justify-content: flex-end;
`;

export const UnorderedListStyled = styled.ul`
  box-shadow: ${(props) => props.theme.boxShadow.default};
  font-family: ${(props) => props.theme.fonts.secondary};
  margin: ${(props) => props.theme.margins.marginTop} 10px 8px 8px;
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.contentBackgroundColor};
`;
