import {PopupStyled} from './DeletePopupStyles'

const DeletePopup = ({ingredientName, closeWindow, deleteIngredient}) => (
    <PopupStyled>
        <p>Delete ingredient:</p>
        <hr />
        <b>{ingredientName}</b>
        <hr />
        Existing recipes will be unaffected.
        <div>
            <button onClick={closeWindow}>Cancel</button>
            <button onClick={deleteIngredient}>Delete</button>
        </div>
    </PopupStyled>
);
export default DeletePopup