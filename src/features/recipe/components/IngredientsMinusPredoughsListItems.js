import FlattenedRecipeListItem from "./FlattenedRecipeListItem";
import { CenteredListItemStyled } from "./IngredientsMinusPredoughsListItemsStyles";

const IngredientsMinusPredoughsListItems = ({
  flattenedRecipeState,
  dispatch,
}) => {
  const hasPredoughs = flattenedRecipeState.flattenedRecipe.some(
    (item) => item.depth !== 0
  );

  return (
    <>
      {hasPredoughs && (
        <>
          <CenteredListItemStyled>
            Ingredients minus predoughs
          </CenteredListItemStyled>
          {flattenedRecipeState.flattenedRecipe
            .slice(1)
            .map((flattenedRecipeItem) => (
              <FlattenedRecipeListItem
                key={`${flattenedRecipeItem.index}`}
                flattenedRecipeItem={flattenedRecipeItem}
                isValidOverallRecipe={flattenedRecipeState.isValidOverallRecipe}
                stepsMode={true}
                recipe_view={flattenedRecipeState.recipe_view}
                dispatch={dispatch}
              />
            ))}
        </>
      )}
    </>
  );
};

export default IngredientsMinusPredoughsListItems;
