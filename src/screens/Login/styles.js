import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    //padding: 20px;
    font-family: Arial, sans-serif;
    height: 100vh;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.span`
    position: absolute;
    top: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6c63ff;
    font-size: 32px;
`;

export const GoogleLogo = styled.div`
    position: absolute;
    bottom: 270px;
    background-color: white;
    border-radius: 50%;
    border: solid 1px gray;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;

    img{
        width: 30px;
        height: 30px;
    }
`;


export const LoginButton = styled.button`
    position: absolute;
    bottom: 200px;
    background-color: #6c63ff;
    color: white;
    border: none;
    border-radius: 10px;
    padding: 10px 20px;
    font-size: 16px;
    width: 200px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: Arial, sans-serif;

    :hover{
        background-color: darkviolet;
    }
`;