import styled from "styled-components";

const FlexContainerStyled = styled.div`
  display: flex;
  align-items: center;
`;

export const RecipeListItemLeftStyled = styled(FlexContainerStyled)``;

export const RecipeListItemRightStyled = styled(FlexContainerStyled)`
  justify-content: space-between;
  width: 150px;
`;

export const TabStyled = styled.span`
  width: 84px;
  display: flex;
  justify-content: flex-end;
`;

export const RecipeListItemStyled = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #eae2b7;
`;
export const ContainerStyled = styled.span` // needed for alignment
  display: flex;
`;

export const CenteredListItemStyled = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;
