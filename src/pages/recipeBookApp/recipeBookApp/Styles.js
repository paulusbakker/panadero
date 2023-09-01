import styled from 'styled-components'

export const BelowNavbarSpaceStyled = styled.div`
  height: calc(100vh - 78px);
`;

export const TabContainerUlStyled = styled.ul`
  font-family: ${({ theme }) => theme.fonts.secondary};
  font-size: 25px;
  background-color: lightgrey;
  margin-bottom: 10px;
  margin-left: 8px;
  margin-right: 8px;

  > li {
    background-color: ${({ theme }) => theme.colors.contentBackgroundColor};
    margin-top: 8px;
    padding: 5px;
    box-shadow: ${({ theme }) => theme.boxShadow.default}  }
`;