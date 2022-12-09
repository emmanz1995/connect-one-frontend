import styled from 'styled-components';

export const MasterContainer = styled.main`
  display: flex;
  flex: 1;
  //display: grid;
  //grid-template-columns: repeat(12, minmax(0, 1fr));
  // max-width: 1400px;
  // margin: 0 auto;
  gap: 25px;
  @media screen and (max-width: ${props => props.theme.sm_screen}) {}
`;
export const Main = styled.div`
  width: 60%;
  margin: 15px 0;
  padding: 0 80px;
  //grid-column: span 6/ span 6;
  @media screen and (max-width: ${props => props.theme.sm_screen}) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;
export const Nav = styled.nav`
  width: 100%;
  background-color: rgb(17 24 39 / 1);
  padding: 15px;
  margin: 10px 0;
  border-radius: 5px;
  display: none;
  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style: none;
  }
  @media screen and (max-width: ${props => props.theme.sm_screen}) {
    display: block;
  }
`;
// export const MasterContainer = styled.main``;