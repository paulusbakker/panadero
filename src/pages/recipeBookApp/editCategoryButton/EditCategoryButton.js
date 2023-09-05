import React from 'react';
import {EditCategoryButtonStyled} from './Styles'

function EditCategoryButton({categoryName}) {
    return (
        <EditCategoryButtonStyled data-action="EditCategoryButton" data-category-name={categoryName} >
            Edit Category
        </EditCategoryButtonStyled>
    );
}

export default EditCategoryButton;
