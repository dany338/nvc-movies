import React, { useState, useEffect, useCallback } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import firebase from 'firebase';
/* Components */
import CardMovie from '../../components/CardMovie';
/* Style Components */
import { Container } from './styled';
/* Hooks */
import { useMovies } from '../../infraestructure/hooks';
import db from '../../firebase';

const modalRoot = document.getElementById('modal-root');
const customStyles = {
  overflowY: 'auto',
};

const Movies = () => {
  const [ processing, setProcessing ] = useState(false);
  const [ visible, setVisible ] = useState(false);
  const [ movieSelected, setMovieSelected ] = useState(null);
  const {
    isLoading,
    data,
    currentPage,
    getMoviesNewsRequest
  } = useMovies();

  const handleCloseModal = () => {
    setVisible(false);
  };

  const handleLoadMore = async () => {
    await getMoviesNewsRequest(currentPage + 1);
  };

  const load = useCallback(async () => {
    await getMoviesNewsRequest(1);
  }, [getMoviesNewsRequest]);

  useEffect(() => {
    if(!processing) {
      load();
      setProcessing(true);
    }
  }, [load, processing]);

  return (
    <Container>
      <h2>Recommended</h2>
      <div className="recommended__movies">
        {!processing ? (
          <div style={{justifyContent: 'flex-end', width: '100%'}}>
            Loading information wait moment please...
            <SkeletonTheme color="#f42f6391" highlightColor="#444">
              <Skeleton height={34} />
            </SkeletonTheme>
          </div>
        ) : (
          <>
            {data.map((movie) => <CardMovie key={`movie-${movie.id}`} {...movie} /> )}
          </>
        )}
      </div>
      <hr />
      {data && (
        <div className="movie__loadMore" onClick={handleLoadMore}>
          <h4>LOAD MORE...</h4>
        </div>
      )}
    </Container>
  )
};

export default Movies;
