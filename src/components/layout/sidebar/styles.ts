import styled from 'styled-components';

export const StyledSidebar = styled.aside`
  width: 20%;
  //grid-column: span 3/span 3;
  background-color: rgb(17 24 39 / 1);
  padding: 15px;
  @media screen and (max-width: ${props => props.theme.sm_screen}) {
    display: none;
  }
`;
export const List = styled.ul`
  list-style: none;
  //margin: 0;
  padding: 0;
  position: sticky;
  top: 0;
  color: #F4F7FE;
`;

export const NavLink = styled.li`
  margin: 10px 0;
  padding: 15px 0;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  a {
    text-decoration: none;
    color: #F4F7FE;
    font-size: 20px;
    padding: 10px;
    &:hover {
      color: rgb(106 85 250 / 1);
      transition: all 0.2s ease-in-out;
    }
  }
`;

export const SignoutButton = styled.button`
  width: 100%;
  margin: 10px 30px;
  padding: 10px 20px;
  background-color: rgb(106 85 250 / 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    color: rgb(17 24 39 / 1);
    transition: all 0.2s ease-in-out;
  }
`;