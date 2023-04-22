import { useEffect } from "react";
import { useSelector } from "react-redux";

import CardSlider from "../components/ui/CardSlider";
import Container from "../components/ui/Container";
import useHttp from "../hooks/useHttp";

export default function Upcoming() {
  const { upcomingMovies } = useSelector((state) => state.movie);
  const { upcomingTVShows } = useSelector((state) => state.tv);
  const { loadUpcoming } = useHttp();

  useEffect(() => {
    loadUpcoming("movie");
    loadUpcoming("tv");
  }, []);

  return (
    <Container style={{ marginTop: "15rem" }}>
      <CardSlider data={upcomingMovies} heading={"Upcoming Movies"} />
      <CardSlider data={upcomingTVShows} heading={"Upcoming TV Shows"} />
    </Container>
  );
}
