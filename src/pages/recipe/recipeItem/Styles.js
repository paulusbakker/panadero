import styled from "styled-components";

export const ContainerStyled = styled.span` // needed for alignment
  display: flex;
`;

export const ListItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eae2b7;
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