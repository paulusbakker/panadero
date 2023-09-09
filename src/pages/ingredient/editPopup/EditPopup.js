import {ItemHeaderStyled, PopupStyled} from './Styles'

const EditPopup = ({
                        editableName, setEditableName,
                        selectedCategory, setSelectedCategory,
                        editablePrice, setEditablePrice,
                        editableCalories, setEditableCalories,
                        submitChanges,
                        sortedCategories,
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
                {sortedCategories.map(([key, value]) => (
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

export default EditPopup