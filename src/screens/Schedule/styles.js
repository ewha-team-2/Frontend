import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 60px;
  left: 0;
  padding: 20px;
  font-family: Arial, sans-serif;
  overflow-y: scroll;
  width: calc(100% - 40px);
  height: calc(100% - 180px);
`;

export const Head = styled.div`
  display: flex;
  align-items: center;

  .date-circle {
    background: #6c63ff;
    color: white;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
  }

  .date {
    font-size: 16px;
  }

  .add-button {
    position: absolute;
    right: 20px;
    width: 80px;
    background: #6c63ff;
  }
`;

export const PlanList = styled.ol`
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 0;
`;

export const PlanItem = styled.li`
  display: flex;
  flex-direction: row;
  height: 80px;
  width: 100%;
  margin-bottom: 15px;

  .item-time {
    display: flex;
    align-items: center;
    width: 50px;

    span {
      font-size: 14px;
      color: gray;
    }
  }

  .item-content {
    position: relative;
    display: flex;
    flex-direction: column;
    border: 1px solid gray;
    border-radius: 10px;
    padding: 10px;
    height: 60px;
    width: calc(100% - 70px);
  }

  .place {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .description {
    color: gray;
    font-size: 14px;
  }

  .budget {
    position: absolute;
    top: 10px;
    right: 10px;
    color: gray;
  }

  .edit-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 50px;
    height: 30px;
    padding: 0;
    border-radius: 10px;
    text-align: center;
    background-color: lightgray;
  }
`;
