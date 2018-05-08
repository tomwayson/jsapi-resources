// NOTE: it's probably a good idea to move the config logic 
// into this file as well
import "../config";

// in order to lazy-lad the ArcGIS API for JavaScript bundles
// all imports from 'esri' should be co-located in this module 
import * as FeatureLayer from "esri/layers/FeatureLayer";
import * as WebMap from "esri/WebMap";
import * as SceneView from "esri/views/SceneView";

// then other modules (components) can dynamically `import()` this module
// and use the functions below to access the esri modules
export function newFeatureLayer(...args: any[]) {
  return new FeatureLayer(...args);
}
export function newWebMap(...args: any[]) {
  return new WebMap(...args);
}
export function newSceneView(...args: any[]) {
  return new SceneView(...args);
}
