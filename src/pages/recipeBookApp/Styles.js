import styled from 'styled-components';
import {Link} from 'react-router-dom'

export const BackgroundOverlayStyled = styled.div`
  z-index: 10000;
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7f1f185;
  left: 0;
  top: 0;
`;

export const CategoryEditWindowStyled = styled.div`
  z-index: 10001;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1em 1em 1em 1em;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

// ... (continue in the same way for other classes)

export const TabContainerStyled = styled.ul`
  margin-left: 8px;
  margin-right: 8px;
  font-family: \\"Arial Rounded MT Bold\\", sans-serif;
  font-size: 25px;
`;

export const AccordionItemStyled = styled.li`
  background-color: #EAE2B7;
  margin-top: 8px;
  padding: 5px;
  box-shadow: 10px 10px 34px -11px rgba(0, 0, 0, 0.75);
  color: #003049;
`;

export const LinkStyled=styled(Link)`
  color: #003049;
`
export const CategoryLabelStyled=styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: -7px;
`

export const EditCategoryButtonStyled = styled.div`
    position: absolute;
    background-color: lightgrey;
    top: 20px;
    right: 7px;
    padding: 5px;
    box-shadow: 10px 10px 34px 0 rgba(0, 0, 0, 0.75);
`;

export const ItemsCountStyled=styled.div`
  font-size: large;
`