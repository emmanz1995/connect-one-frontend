import styled from 'styled-components';

export const PostCard = styled.div`
  width: 100%;
//   padding: 20px;
`;
export const Card = styled.div`
  padding: 15px;
  width: 100%;
  margin: 15px auto;
  background-color: rgb(17 24 39 / 1);
  border-radius: 8px;
  .card-header {
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: space-between;
    color: #F4F7FE;
    .p-name {
      font-weight: 800;
    }
  }
  .card-body {
    color: #F4F7FE;
    margin: 20px 0;
  }
  .card-footer {
    display: flex;
    align-items: center;
    gap: 20px;
    .icons {
      color: #F4F7FE;
      cursor: pointer;
    }
    .like-action {
      color: #F4F7FE;
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .comment-action {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #F4F7FE;
      gap: 5px;
      .comment-btn {
        background-color: #18191A;
        color: #F4F7FE;
        padding: 10px 15px;
        border-radius: 5px;
        border: 1px solid #ddd;
        cursor: pointer;
      }
    }
  }
  .img {
    width: 100%;
    height: auto;
  }
  .p-name {
    font-weight: 800;
  }
`;