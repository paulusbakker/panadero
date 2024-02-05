import { CenteredListItemStyled } from "./Styles";
import FlattenedRecipeListItems from "../flattenedRecipeListItems/FlattenedRecipeListItems";

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
              <FlattenedRecipeListItems
                key={`${flattenedRecipeItem.sequenceNumber}`}
                flattenedRecipeItem={flattenedRecipeItem}
                stepsMode={true}
                viewMode={flattenedRecipeState.viewMode}
                dispatch={dispatch}
              />
            ))}
        </>
      )}
    </>
  );
};

export default IngredientsMinusPredoughsListItems;
