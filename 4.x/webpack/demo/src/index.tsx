import * as React from "react";
import * as ReactDOM from "react-dom";
import * as Loadable from "react-loadable";

import { Header } from "./components/header";
// import { WebMapComponent } from "./components/webmapview";

import "./css/main.scss";

const Loading = () => {
  return <div>Loading...</div>
}

const LoadableWebMapComponent = Loadable({
  loader: () => import("./components/webmapview"),
  loading: Loading,
});

/**
 * React portion of application
 */
ReactDOM.render(
  <div className="main">
    <Header appName="Webpack App"/>
    <LoadableWebMapComponent />
  </div>,
  document.getElementById("app")
);
