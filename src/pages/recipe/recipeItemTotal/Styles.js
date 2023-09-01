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
  background-color: ${(props) => props.theme.colors.contentBackgroundColor};
`;
