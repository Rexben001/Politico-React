import styled from "styled-components";

export const VoteStyle = styled.div`
  padding: 1rem 0;
  min-height: 95vh;
  display: flex;
  box-sizing: border-box;

  .sideDrawer {
    margin-top: 3rem;
    width: 20%;
    background-color: rgb(1, 34, 1);
    color: white;
  }

  .sideDrawer > p {
    font-size: 1.2rem;
    padding: 1rem;
  }

  .main-content {
    margin-top: 4rem;
    padding: 1rem;
    width: 80%;
    box-sizing: border-box;
    font-size: 1rem;
    text-align: center;
    .votes {
      width: 100%;
      box-sizing: border-box;
      display: flex;
        flex-wrap: nowrap;
        justify-content: space-evenly;
      .votes-div {
        box-sizing: border-box;
        width: 25%;
        min-height: 75px;
        box-shadow: 0 2px 2px red;
        cursor: pointer;
        
        img {
          width: 100%;
          height: 60%;
          margin-bottom: .5rem;
        }
        p {
          padding: 0;
          margin: 0;
          font-size: 1.2rem;
        }
        button {
          padding: 0.8rem 1.5rem;
          margin: 1rem;
          border-radius: 10px;
          font-size: 1.2rem;
          cursor: pointer;
          outline: none;
          background-color: green;
          color: white;
        }
      }
    }
  }
`;
