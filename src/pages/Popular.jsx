import { Fragment, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { useSelector } from "react-redux";

import Container from "../components/ui/Container";
import CarouselItem from "../components/ui/CarouselItem";
import CardSlider from "../components/ui/CardSlider";
import useHttp from "../hooks/useHttp";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Popular.css";

export default function Popular() {
  const { popularMovies, topRatedMovies, movieLoading } = useSelector(
    (state) => state.movie
  );
  const { popularTVShows, topRatedTVShows, tvLoading } = useSelector(
    (state) => state.tv
  );
  const { loadPopular, loadTopRated } = useHttp();

  useEffect(() => {
    loadPopular("movie");
    loadTopRated("movie");
    loadPopular("tv");
    loadTopRated("tv");
  }, []);

  return (
    <Container>
      {!movieLoading && !tvLoading && (
        <Fragment>
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={3}
            infiniteLoop={true}
            showStatus={false}
            renderArrowPrev={(clickHandler) => (
              <div className="arrow left-arrow" onClick={clickHandler}>
                <i className="fa-solid fa-arrow-left-long"></i>
              </div>
            )}
            renderArrowNext={(clickHandler) => (
              <div className="arrow right-arrow" onClick={clickHandler}>
                <i className="fa-solid fa-arrow-right-long"></i>
              </div>
            )}
          >
            {popularMovies.map((movie) => (
              <CarouselItem key={movie.id} movie={movie} />
            ))}
          </Carousel>

          <CardSlider
            className="first_slider"
            data={topRatedMovies}
            heading={"Top Rated Movies"}
          />
          <CardSlider data={popularTVShows} heading={"Popular TV Shows"} />
          <CardSlider data={topRatedTVShows} heading={"Top Rated TV Shows"} />
        </Fragment>
      )}
    </Container>
  );
}
