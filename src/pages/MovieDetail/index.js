import React, { useState, useEffect, useCallback }  from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
/* Components */
import CardMovieDetail from '../../components/CardMovieDetail';
/* Style Components */
import { Container } from './styled';
/* Hooks */
import { useMovies } from '../../infraestructure/hooks';
/* Constants */
import { BASE_PATH_IMG } from '../../infraestructure/config/const';

const MovieDetail = ({ match, history }) => {
  const [ processing, setProcessing ] = useState(false);
  const [ movie, setMovie ] = useState(null);
  const [ paramsId, setParamsId ] = useState(0);
  const { getMovieByIdRequest } = useMovies();

  const load = useCallback(async () => {
    const { msg, err } = await getMovieByIdRequest(match.params.id);
    if(!err) {
      setMovie(msg);
      setParamsId(match.params.id);
    }
  }, [getMovieByIdRequest, match.params.id]);

  useEffect(() => {
    if(!processing) {
      load();
      setProcessing(true);
    }
  }, [load, movie, processing]);

  useEffect(() => {
    if(paramsId !== 0 && paramsId !== match.params.id) {
      setProcessing(false);
    }
  }, [load, paramsId, match.params.id]);

  return (
    <Container>
      <div className="movie__filter">
        <Link to="/"><i className="material-icons">keyboard_backspace</i></Link>
        <h2>MOVIE # <small>{match.params.id}</small></h2>
      </div>
      {!processing ? (
        <div style={{justifyContent: 'flex-end', width: '100%'}}>
          Loading information wait moment please...
          <SkeletonTheme color="#ccc" highlightColor="lightgray">
            <Skeleton width={600} height={500} />
          </SkeletonTheme>
        </div>
      ) : (
        <>
          <hr />
          {movie && (
            <div className="movie__row">
              <img
                className="movieDetail__logo"
                src={movie.poster_path ? (`${BASE_PATH_IMG}/w500${movie.poster_path}`) : ('https://via.placeholder.com/150.png')}
                alt={movie.original_title}
              />
              <div className="movieDetail__text">
                <h4>{movie.original_language} {movie.adult && (<i className="material-icons" title="Adults">accessibility_new</i>)}</h4>
              </div>
            </div>
          )}
          <hr />
          {movie && (<CardMovieDetail {...movie} />)}
        </>
      )}
    </Container>
  )
}

MovieDetail.propTypes = {
  match: PropTypes.oneOfType([PropTypes.object]),
  history: PropTypes.oneOfType([PropTypes.object]),
};

MovieDetail.defaultProps = {
  match: {},
  history: {},
};


export default withRouter(MovieDetail);
