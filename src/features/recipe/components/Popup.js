import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIONS, TOTAL } from '../../../shared/constants/constants';
import { BackgroundOverlayStyled, PopupStyled } from './PopupStyles';
import EnterAmount from './EnterAmount';

function Popup({ flattenedRecipeState, dispatch }) {
    console.log('popup state:', {
        showPopup: flattenedRecipeState.showPopup,
        isFirstView: flattenedRecipeState.isFirstView,
        isValidOverallRecipe: flattenedRecipeState.isValidOverallRecipe,
        index: flattenedRecipeState.index
    });
    console.log('Recipe items:', flattenedRecipeState.flattenedRecipe.map(item => ({
        name: item.name,
        isFaulty: item.isFaulty,
        issues: item.issues
    })));
    const { showPopup, isValidOverallRecipe, flattenedRecipe, index, isFirstView } = flattenedRecipeState;
    const navigate = useNavigate();

    if (!showPopup) {
        console.log('Popup not shown because showPopup is false');
        return null;
    }

    const handleClick = (e) => {
        if (!e.target.closest(`[data-action='popup']`)) {
            handleClose();
        }
    };

    const handleClose = () => {
        dispatch({ type: ACTIONS.CANCEL });
    };

    const handleForward = () => {
        const recipeId = flattenedRecipe[index].id;
        navigate(`/recipe/view/${recipeId}`);
    };

    const renderIssues = (item) => {
        if (!item || !item.issues || item.issues.length === 0) return null;
        
        return (
            <ul>
                {item.issues.map((issue, i) => {
                    let message = '';
                    switch (issue.type) {
                        case 'TOTAL_FLOUR_NOT_100':
                            message = `Total flour percentage is ${(issue.details.invalidFlourPercentage * 100).toFixed(1)}% (should be 100%)`;
                            break;
                        case 'NEGATIVE_STEP_PERCENTAGE':
                            message = 'Negative step percentage detected';
                            break;
                        case 'MISSING_INGREDIENT_IN_PARENT':
                            message = 'Ingredient is missing in parent recipe';
                            break;
                        case 'MISSING_INGREDIENTS_IN_CHILD':
                            message = 'Missing ingredients in child recipe';
                            break;
                        default:
                            message = issue.type;
                    }
                    return <li key={i}>{message}</li>;
                })}
            </ul>
        );
    };

    const renderOverlayContent = () => {
        if (!flattenedRecipe) {
            console.log('No flattenedRecipe');
            return null;
        }

        if (isFirstView) {
            if (!isValidOverallRecipe) {
                // Show all issues in the recipe
                const faultyItems = flattenedRecipe.filter(item => item.issues && item.issues.length > 0);
                return (
                    <>
                        <h3>This recipe has errors:</h3>
                        {faultyItems.length > 0 ? (
                            faultyItems.map((faultyItem, i) => (
                                <div key={i}>
                                    <h4>Errors in {faultyItem.name}:</h4>
                                    {renderIssues(faultyItem)}
                                </div>
                            ))
                        ) : (
                            <p>No specific errors found</p>
                        )}
                        <button onClick={handleClose}>OK</button>
                    </>
                );
            }
            // Don't show popup for valid recipes on first view
            return null;
        }

        // For non-first view, we need a valid index
        const isTotal = [TOTAL.FLOUR, TOTAL.LIQUID, TOTAL.RECIPE].includes(index);
        if (!flattenedRecipe[index] && !isTotal) {
            console.log('No item at ondex', index);
            console.log('kut');
            return null;
        }

        const item = flattenedRecipe[index];
        const isRecipe = item.isRecipe;
        const isFaultyRecipe = item.isFaultyRecipe;
        const isFaultyIngredient = item.isFaultyIngredient;

        console.log('Rendering content for:', {
            isFirstView,
            isValidOverallRecipe,
            isRecipe,
            isFaultyRecipe,
            isFaultyIngredient
        });

        if (!isValidOverallRecipe) {
            if (isRecipe) {
                if (isFaultyRecipe) {
                    return (
                        <>
                            <h3>Errors in {item.name}:</h3>
                            {renderIssues(item)}
                            {index !== 0 && (
                                <>
                                    <p>Would you like to go to this recipe?</p>
                                    <button onClick={handleForward}>Yes</button>
                                </>
                            )}
                            <button onClick={handleClose}>OK</button>
                        </>
                    );
                }
                return (
                    <>
                        <p>Would you like to go to this recipe?</p>
                        <button onClick={handleClose}>No</button>
                        <button onClick={handleForward}>Yes</button>
                    </>
                );
            }

            if (isFaultyIngredient) {
                return (
                    <>
                        <h3>Errors in {item.name}:</h3>
                        {renderIssues(item)}
                        <button onClick={handleClose}>OK</button>
                    </>
                );
            }

            return (
                <>
                    <p>This ingredient is missing in its parent recipe</p>
                    <button onClick={handleClose}>OK</button>
                </>
            );
        }

        const name = [TOTAL.FLOUR, TOTAL.LIQUID, TOTAL.RECIPE].includes(index) ? index : item.name;
        return <EnterAmount name={name} dispatch={dispatch} />;
    };

    const content = renderOverlayContent();
    if (!content) {
        console.log('No content to render');
        return null;
    }

    return (
        <BackgroundOverlayStyled onClick={handleClick}>
            <PopupStyled data-action="popup">
                {content}
            </PopupStyled>
        </BackgroundOverlayStyled>
    );
}

export default Popup;
