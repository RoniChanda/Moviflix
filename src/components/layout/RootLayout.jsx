import { Fragment } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import SearchBox from "../ui/SearchBox";

export default function RootLayout() {
  return (
    <Fragment>
      <Navbar />
      <SearchBox />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </Fragment>
  );
}
