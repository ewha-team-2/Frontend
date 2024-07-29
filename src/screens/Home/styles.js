import styled from 'styled-components'; // npm install styled-components

export const Container = styled.div`
    position: fixed;
    top: 60px;
    left: 0;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    overflow-y: scroll;
    width: calc(100% - 40px);
    height: calc(100% - 180px);
`;

export const AddButton = styled.button`
    padding: 10px 20px;
    border: 2px solid #6c63ff;
    background: none;
    color: black;
    font-size: 16px;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    text-align: left;

    cursor: pointer;
    &:hover {
        background: #6c63ff;
        color: white;
    }
`;

export const TravelList = styled.div`
    margin-top: 20px;
    width: 100%;
    max-width: 500px;
`;

export const TravelItem = styled.div`
    height: 80px;
    padding: 10px;
    margin-bottom: 10px;
    background: #f0f0f0;
    border-radius: 10px;

    .title{
        margin: 0;
    font-size: 18px;
    }

    .date{
        margin: 5px 0 0;
        font-size: 14px;
    }
`;

export const ModalWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalContent = styled.form`
    background: white;
    padding: 20px;
    padding-top: 45px;
    border-radius: 10px;
    width: calc(100% - 80px);
    max-width: 400px;
    position: relative;

    label{
        display: block;
        margin-bottom: 5px;
        font-size: 14px;
    }

    input {
        width: calc(100% - 20px);
        padding: 10px;
        margin-bottom: 10px;
        border: 1px solid #ccc;
        border-radius: 10px;
    }
`;

export const CloseButton = styled.span`
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    font-size: 24px;
`;

export const SubmitButton = styled.button`
    padding: 10px 20px;
    margin-top: 10px;
    border: none;
    background: #6c63ff;
    color: white;
    font-size: 16px;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    &:hover {
        background: #5752d1;
    }
`;