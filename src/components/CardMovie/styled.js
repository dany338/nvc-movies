import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled(Link)`
  width: 270px;
  margin-bottom: 40px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #fff;
  box-shadow: 0 20px 25px -5px rgba(0,0,0,.1), 0 10px 10px -5px rgba(0,0,0,.04);
  transition: transform .2s ease-in-out,box-shadow .2s ease-in-out,-webkit-transform .2s ease-in-out;
  border-radius: 7px;

  .movie__thumbnail {
    height: 200px;
    width: 270px;
    border-radius: 7px 7px 0 0;
    background-position: 50%;
    background-size: cover;
    border-radius: 7px 7px 0 0;
  }

  .movie__info {
    display: flex;
    margin-top: 10px;
    padding-right: 30px;
  }

  .video__text {
    margin-left: 15px;
  }

  .video__text > h4 {
    font-size: 14px;
    margin-bottom: 5px;
  }

  .video__text > p {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    font-size: 14px;
    color: gray;
  }

  .video__text > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    font-size: 14px;
    color: gray;
  }

  .movie__roll__over {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    border-radius: 8px;
    visibility: hidden;
    opacity: 0;
    transition: linear .2s;
    backdrop-filter: blur(20px);
  }

  .movie__avatar {
    height: 30px !important;
    width: 30px !important;
    border-radius: 50%;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 25px 50px -12px rgba(0,0,0,.25);
    cursor: pointer;

    .movie__roll__over {
      visibility: visible;
      opacity: 1;
      color: #fff;
      padding: 15px
    }
  }
`;

export default Container;
