import React, { useState, useEffect, useCallback } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import InfiniteScroll from "react-infinite-scroll-component";
import firebase from 'firebase';
/* Components */
import CardMovie from '../../components/CardMovie';
/* Style Components */
import { Container } from './styled';
/* Hooks */
import { useMovies } from '../../infraestructure/hooks';

const Movies = () => {
  const [ hasMore, setHasMore ] = useState(true);
  const [ processing, setProcessing ] = useState(false);
  const {
    data,
    filter,
    currentPage,
    getMoviesNewsRequest,
    getSearchMoviesRequest
  } = useMovies();

  const handleLoadMore = async () => {
    const { query } = filter;
    if(query !== '') {
      await getSearchMoviesRequest(currentPage + 1, query);
    } else {
      await getMoviesNewsRequest(currentPage + 1);
    }
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
          <InfiniteScroll
            className="recommended__movies"
            dataLength={data.length} //This is important field to render the next data
            next={handleLoadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{textAlign: 'center'}}>
                <b>Not more data for loader!</b>
              </p>
            }
          >
            {data.map((movie) => <CardMovie key={`movie-${movie.id}`} {...movie} /> )}
          </InfiniteScroll>
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
