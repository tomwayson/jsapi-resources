import * as React from "react";
import { loadModules } from 'esri-loader';

export class WebMapComponent extends React.Component<{}> {
  mapDiv: any;

  componentDidMount() {
    loadModules([
     "esri/layers/FeatureLayer",
     "esri/WebMap",
     "esri/views/SceneView"
    ], {
      url: "https://js.arcgis.com/4.7/",
      css: "https://js.arcgis.com/4.7/esri/css/main.css"
    }).then(([FeatureLayer, WebMap, SceneView]) => {
      const featureLayer = new FeatureLayer({
        id: "states",
        portalItem: {
          id: "b234a118ab6b4c91908a1cf677941702"
        },
        outFields: ["NAME", "STATE_NAME", "VACANT", "HSE_UNITS"],
        title: "U.S. counties"
      });
      
      const webmap = new WebMap({
        portalItem: {
          id: "3ff64504498c4e9581a7a754412b6a9e"
        },
        layers: [featureLayer]
      });
      
      const view = new SceneView({
        map: webmap,
        container: this.mapDiv
      });
  
      featureLayer.when(() => {
        view.goTo({ target: featureLayer.fullExtent });
      });
    });
  }

  render() {
    return (
      <div className="webmap"
        ref={
          element => this.mapDiv = element
        }>
      </div>
    );
  }
}
