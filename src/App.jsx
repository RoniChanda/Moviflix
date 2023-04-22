import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import RootLayout from "./components/layout/RootLayout";
import Popular from "./pages/Popular";
import Upcoming from "./pages/Upcoming";
import Movies from "./pages/Movies";
import TVSeries from "./pages/TVSeries";
import Details from "./pages/Details";
import Person from "./pages/Person";
import Search from "./pages/Search";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "popular", element: <Popular /> },
      { path: "upcoming", element: <Upcoming /> },
      { path: "movies", element: <Movies /> },
      { path: "tvseries", element: <TVSeries /> },
      { path: "person/:id", element: <Person /> },
      { path: "details/:type/:id", element: <Details /> },
      { path: "search/:query", element: <Search /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
