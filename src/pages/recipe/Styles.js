import styled from "styled-components";

const FlexContainerStyled = styled.div`
  display: flex;
  align-items: center;
`;

const FlexItemRightAlignedStyled = styled.span`
  width: 84px;
  display: flex;
  justify-content: flex-end;
`;

export const UlStyled = styled.ul`
  font-size: large;
`;

export const RecipeListItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eae2b7;
`;

export const RecipeListItemLeftStyled = styled(FlexContainerStyled)``;

export const RecipeListItemRightStyled = styled(FlexContainerStyled)`
  justify-content: space-between;
  align-items: center;
  width: 150px;
`;

export const TabStyled = FlexItemRightAlignedStyled;

export const ContainerStyled = styled.span`
  display: flex;
  // Other styling here
`;

export const CenteredListItemStyled = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;