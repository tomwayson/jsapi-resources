import * as React from "react";

interface ComponentProps {
  onload: (view: HTMLDivElement) => void;
}

export class WebMapComponent extends React.Component<ComponentProps, {}> {
  mapDiv: any;

  componentDidMount() {
    this.props.onload(this.mapDiv);
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
