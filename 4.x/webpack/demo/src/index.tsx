import "./config";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { Header } from "./components/header";
import { WebMapComponent } from "./components/webmapview";

import "./css/main.scss";

/**
 * React portion of application
 */
ReactDOM.render(
  <div className="main">
    <Header appName="Webpack App"/>
    <WebMapComponent />
  </div>,
  document.getElementById("app")
);
