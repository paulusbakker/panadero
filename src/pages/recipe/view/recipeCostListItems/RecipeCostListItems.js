import { VIEWMODE } from "../../../../constants/constants";
import { CenteredListItemStyled } from "./Styles";
import RecipeCostListItem from "./recipeCostListItem/RecipeCostListItem";

const RecipeCostListItems = ({ flattenedRecipeState }) => {
  const shouldShowCosts =
    flattenedRecipeState.viewMode === VIEWMODE.VIEW_AMOUNTS;

  return (
    <>
      {shouldShowCosts && (
        <>
          <CenteredListItemStyled>Costs</CenteredListItemStyled>
          {flattenedRecipeState.flattenedRecipe
            .slice(1)
            .map((flattenedRecipeItem) =>
              flattenedRecipeItem.depth === 0 ? (
                <RecipeCostListItem
                  keyRecipeCostListItem={`${flattenedRecipeItem.sequenceNumber}-${flattenedRecipeItem.id}`}
                  flattenedRecipeItem={flattenedRecipeItem}
                  totalRecipe={false}
                />
              ) : null
            )}

          <hr />
          <RecipeCostListItem
            flattenedRecipeItem={flattenedRecipeState.flattenedRecipe[0]}
            totalRecipe={true}
          />
        </>
      )}
    </>
  );
};

export default RecipeCostListItems;
