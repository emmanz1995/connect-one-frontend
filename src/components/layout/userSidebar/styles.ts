import styled from 'styled-components';

export const StyledAside = styled.aside`
  width: 20%;
  //grid-column: span 3/ span 3;
  color: ${props => props.theme.light_color};
  // margin: 15px 0;
  background-color: rgb(17 24 39 / 1);
  @media screen and (max-width: ${props => props.theme.sm_screen}) {
    display: none;
  }
`;
export const StyledUserList = styled.ul`
list-style: none;
padding: 0;
position: sticky;
top: 0;
color: #F4F7FE;
margin: 25px;
.user-li {
  background-color: rgb(31 41 55);
  padding: 10px;
  border-radius: 5px;
  margin: 15px 0;
  a {
    color: #FFFF;
    cursor: pointer;
    text-decoration: none;
  }
}
.follow-btn {
  background-color: rgb(106 85 250 / 1);
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-weight: 800;
  &:hover {
    color: rgb(17 24 39 / 1);
    transition: all 0.2s ease-in-out;
  }
}
`;