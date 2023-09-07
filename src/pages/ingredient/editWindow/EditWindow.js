import {ItemHeaderStyled, PopupStyled} from './Styles'

const EditWindow = ({
                        editableName, setEditableName,
                        selectedCategory, setSelectedCategory,
                        editablePrice, setEditablePrice,
                        editableCalories, setEditableCalories,
                        submitChanges,
                        recipeBook,
                        closeWindow,
                    }) => (
    <PopupStyled>
        <ItemHeaderStyled>
            <p>Edit ingredient:</p>
            <input
                type="text"
                value={editableName}
                onChange={(e) => setEditableName(e.target.value)}
            />
        </ItemHeaderStyled>

        <ItemHeaderStyled>
            <span>Category:</span>
            <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                {Array.from(recipeBook.ingredientCategories.entries())
                    .sort((a, b) => a[1].localeCompare(b[1]))
                    .map(([key, value]) => (
                        <option key={key} value={key}>
                            {value}
                        </option>
                    ))}
            </select>
        </ItemHeaderStyled>

        <ItemHeaderStyled>
            <span>Price per kilo:</span>
            <input
                type="text"
                value={editablePrice}
                onChange={(e) => setEditablePrice(e.target.value)}
            />
        </ItemHeaderStyled>

        <ItemHeaderStyled>
            <span>Calories per gram:</span>
            <input
                type="text"
                value={editableCalories}
                onChange={(e) => setEditableCalories(e.target.value)}
            />
        </ItemHeaderStyled>
        <div>
            <button onClick={closeWindow}>Cancel</button>
            <button onClick={submitChanges}>Submit</button>
        </div>
    </PopupStyled>
);

export default EditWindow