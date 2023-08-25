import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FlexItemRightAligned = styled.span`
  width: 84px;
  display: flex;
  justify-content: flex-end;
`;

const FlexContainerSpaceBetween = styled(FlexContainer)`
  justify-content: space-between;
`;

export const RecipeListStyled = styled.ul`
  font-size: large;
`;

export const RecipeListItemStyled = styled(FlexContainerSpaceBetween)``;

export const RecipeListItemLeftStyled = styled(FlexContainer)``;

export const RecipeListItemRightStyled = styled(FlexContainer)`
  justify-content: space-between;
  align-items: center;
  width: 150px;
`;

export const TabStyled = FlexItemRightAligned;

export const ContainerStyled = styled.span`
  display: flex;
  // Other styling here
`;

export const CenteredListItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
`;