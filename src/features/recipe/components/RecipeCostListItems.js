import { RECIPE_VIEW } from "../../../shared/constants/constants";
import { CenteredListItemStyled } from "./RecipeCostListItemsStyles";
import RecipeCostListItem from "./RecipeCostListItem";

const RecipeCostListItems = ({ flattenedRecipeState }) => {
  const shouldShowCosts =
    flattenedRecipeState.recipe_view === RECIPE_VIEW.PROCESSED;

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
                  key={`${flattenedRecipeItem.sequenceNumber}-${flattenedRecipeItem.id}`}
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
