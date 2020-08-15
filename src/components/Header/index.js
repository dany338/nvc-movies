import React, { useState, useEffect, useCallback } from 'react';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import firebase from 'firebase';
/* Style Components */
import { Container } from './styled';
/* Assets */
import assets from '../../assets';
/* Hooks */
import { useMovies } from '../../infraestructure/hooks';
/* Utils */
import { isValidQuery } from '../../infraestructure/config/utils';
import db from '../../firebase';

const Header = () => {
  const [ visible, setVisible ] = useState(false);
  const { getSearchMoviesRequest } = useMovies();

  const handleChangeQuery = async e => {
    const { value } = e.currentTarget;
    if(value.length > 1) {
      if(isValidQuery(value) === null) {
        const { msg, err } = await getSearchMoviesRequest(1, value);
        if(err) {
          Swal.fire({
            title: 'NOT FOUND!',
            icon: 'info',
            text: `The movie ${value} not found: ${msg}`,
            confirmButtonText: 'OK'
          })
        } else {
          db.collection('movies').add({
            search: value,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          });
        }
      } else {
        Swal.fire({
          title: 'NOT VALID!',
          icon: 'info',
          text: `The movie search is not valid! with # or @`,
          confirmButtonText: 'OK'
        })
      }
    }
  };

  return (
    <Container>
      <div className="header__left">
        <Link to="/"><i className="material-icons">menu</i></Link>
        <img
          className="header__logo"
          src={assets.logo}
          alt="Movie Show Time Finder"
        />
      </div>
      <div className="header__input">
        {visible && ( <input onChange={(e) => handleChangeQuery(e)} placeholder="Search enter min 2 letters..." type="text" name="search" /> )}
        <i className="material-icons header__inputButton" onClick={() => setVisible(true)}>search</i>
      </div>
      <div className="header__icons">
        <i className="material-icons header__icon">apps</i>
        <i className="material-icons header__icon">notifications</i>
        <img
          className="header__avatar"
          src={assets.defaultAvatar}
          alt="Default Avatar"
        />
      </div>
    </Container>
  )
};

export default withRouter(Header);
